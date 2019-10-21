import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemDeLista } from 'src/app/models/modelos';

@Component({
  selector: 'app-hacer-denuncia',
  templateUrl: './hacer-denuncia.component.html'
})
export class HacerDenunciaComponent implements OnInit {
  otraFH = false;
  otroLugar = false;
  colectivoEspecifico = false;
  lugaresIncidente: ItemDeLista[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['home']);
  }

}
