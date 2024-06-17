import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { ConfirmLogoutComponent } from '../../../pages/home/login/confirm-logout.component';
import { BusService } from '../../services/bus.service';
import { ToastrService } from 'ngx-toastr';
import { BusCompanyModel } from '../../models/bus.model';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatDialogModule, MatMenuModule, MatIconModule, RouterLink, FormsModule]
})
export class NavbarComponent {
  textToSearch: string = (localStorage.getItem('textToSearch') || '');
  logoURL: string = './assets/images/bus_icon.png';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    // private toastr: ToastrService,
    public busService: BusService
  ) {
    // TODO: traer el id de la empresa del usuario logeado
    const BUS_COMPANY_ID = 1;
    this.busService.GetCompanyLogo(BUS_COMPANY_ID).subscribe({
      next: (resp: BusCompanyModel) => {
        this.logoURL = resp.logo;
      },
      error: () => {
        // this.toastr.error("No se pudo conectar al servidor", 'Intentelo más tarde');
      }
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
