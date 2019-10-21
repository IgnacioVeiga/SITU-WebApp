import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerarAlertaComponent } from './generar-alerta/generar-alerta.component';
import { NoticiasAlertasComponent } from './listado/noticias-alertas.component';
@NgModule({
  declarations: [
    GenerarAlertaComponent,
    NoticiasAlertasComponent
  ],
  imports: [CommonModule]
})
export class NoticasAlertasModule { }
