import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { ConfirmLogoutComponent } from '../../../pages/auth/login/confirm-logout.component';
import { BusService } from '../../services/bus.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { SessionDTO } from '../../models/auth.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatDialogModule, MatMenuModule, MatIconModule, RouterLink, FormsModule]
})
export class NavbarComponent implements OnInit {
  textToSearch: string = (localStorage.getItem('textToSearch') || '');
  logoURL: string = './assets/images/bus_icon.png';

  private toastr = inject(ToastrService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.getSession().subscribe({
      next: (session: SessionDTO) => {
        if (session) {
          this.logoURL = session.logoImageURL;
        }
      },
      error: (err) => this.toastr.error('Error del servidor', err.message)
    });
  }

  doSearch() {
    localStorage.setItem('textToSearch', this.textToSearch);
    if (this.textToSearch.length > 1) {
      // TODO: realiza la busqueda en la lista correspondiente
    }
  }

  confirmLogout() {
    const dialogRef = this.dialog.open(ConfirmLogoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/home']);
      }
    });
  }
}
