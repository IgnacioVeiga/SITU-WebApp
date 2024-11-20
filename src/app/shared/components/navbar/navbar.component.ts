import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { ConfirmLogoutComponent } from '../../../pages/auth/login/confirm-logout.component';
import { FormsModule } from '@angular/forms';
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
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    TranslateModule,
    RouterLink,
  ]
})
export class NavbarComponent implements OnInit {
  textToSearch: string = (localStorage.getItem('textToSearch') || '');
  logoURL: string = './assets/images/bus_icon.png';

  private dialog = inject(MatDialog);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.authService.getSession().subscribe({
      next: (session: SessionDTO) => {
        if (session) {
          this.logoURL = session.logoImageURL;
        }
      }
    });
  }

  doSearch() {
    localStorage.setItem('textToSearch', this.textToSearch);
    if (this.textToSearch.length > 1) {
      // TODO
    }
  }

  confirmLogout() {
    const dialogRef = this.dialog.open(ConfirmLogoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['auth/login']);
      }
    });
  }
}
