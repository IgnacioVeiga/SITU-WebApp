import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmLogoutComponent } from '../dialogs/confirm-logout/confirm-logout.component';
import { BusService } from '../shared/services/bus.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  textToSearch: string = (localStorage.getItem('textToSearch') || '');
  logoURL: string = './assets/images/bus_icon.png';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    public busService: BusService
  ) {
    // TODO: traer el id de la empresa del usuario logeado
    const BUS_COMPANY_ID = 1;
    this.busService.GetCompanyLogo(BUS_COMPANY_ID).subscribe({
      next: (resp: any) => {
        this.logoURL = resp[0].logo;
      },
      error: () => {
        this.toastr.error("No se pudo conectar al servidor", 'Intentelo más tarde');
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
