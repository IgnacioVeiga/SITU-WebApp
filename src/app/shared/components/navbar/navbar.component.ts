import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ConfirmLogoutComponent } from '../../../pages/auth/login/confirm-logout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { SessionDTO } from '../../models/auth.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        MatMenuModule,
        MatIconModule,
        TranslateModule,
        RouterLink,
        RouterLinkActive
    ]
})
export class NavbarComponent implements OnInit {
  private readonly defaultLogo = './assets/images/bus_icon.png';

  logoURL: string = this.defaultLogo;
  sessionRole: string | null = null;
  sessionFullName: string | null = null;

  private dialog = inject(MatDialog);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.authService.getSession().subscribe({
      next: (session: SessionDTO | null) => {
        if (!session) {
          return;
        }

        this.logoURL = session.logoImageURL || this.defaultLogo;
        this.sessionRole = String(session.role);
        this.sessionFullName = session.fullName;
      },
      error: () => {
        this.logoURL = this.defaultLogo;
      }
    });
  }

  canSeeCompanyScopes(): boolean {
    return this.sessionRole === 'ADMIN' || this.sessionRole === 'SUPERVISOR' || this.sessionRole === 'EMPLOYEE';
  }

  useDefaultLogo(): void {
    this.logoURL = this.defaultLogo;
  }

  confirmLogout(): void {
    const dialogRef = this.dialog.open(ConfirmLogoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['auth/login']);
      }
    });
  }
}
