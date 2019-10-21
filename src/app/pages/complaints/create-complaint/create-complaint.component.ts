import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-complaint',
  templateUrl: './create-complaint.component.html'
})
export class CreateComplaintComponent {
  otraFH = false;
  otroLugar = false;
  colectivoEspecifico = false;

  constructor(
    private router: Router
  ) { }

  goHome() {
    this.router.navigate(['home']);
  }

}
