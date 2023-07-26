import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmLogoutComponent } from '../dialogs/confirm-logout/confirm-logout.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router, public dialog: MatDialog) { }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  confirmLogout() {
    const dialogRef = this.dialog.open(ConfirmLogoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/home']);
      }
    });
  }

  // doSearch(event: { target: { value: any; }; }) {
  //   // Esto que escribimos en el buscador
  //   const searchText = event.target.value;

  //   if (searchText.length === 0) {
  //     // Restaura la lista original
  //   } else if (searchText.trim().length > 2) {
  //     // Escribir al menos 2 caracteres para buscar
  //     alert(searchText)
  //   }
  // }
}
