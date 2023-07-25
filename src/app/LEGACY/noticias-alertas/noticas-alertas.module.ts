import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerarAlertaComponent } from './generar-alerta/generar-alerta.component';
import { NoticiasComponent } from './listado/noticias/noticias.component';
import { AlertasComponent } from './listado/alertas/alertas.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    GenerarAlertaComponent,
    AlertasComponent,
    NoticiasComponent
  ],
  imports: [
    MatCardModule,
    MatInputModule,
    CommonModule
  ]
})
export class NoticasAlertasModule { }
