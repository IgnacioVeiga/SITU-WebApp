import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) { }

  goTo(route: string) {
    this.router.navigate([route]);
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
