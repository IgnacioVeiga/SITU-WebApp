import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerarAlertaComponent } from './generar-alerta/generar-alerta.component';
import { NoticiasComponent } from './listado/noticias/noticias.component';
import { AlertasComponent } from './listado/alertas/alertas.component';
@NgModule({
  declarations: [
    GenerarAlertaComponent,
    AlertasComponent,
    NoticiasComponent
  ],
  imports: [CommonModule]
})
export class NoticasAlertasModule { }
