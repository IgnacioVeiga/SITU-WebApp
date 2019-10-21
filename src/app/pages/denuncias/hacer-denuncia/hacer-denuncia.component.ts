import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hacer-denuncia',
  templateUrl: './hacer-denuncia.component.html'
})
export class HacerDenunciaComponent implements OnInit {
  otraFH = false;
  otroLugar = false;
  colectivoEspecifico = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['home']);
  }

}
