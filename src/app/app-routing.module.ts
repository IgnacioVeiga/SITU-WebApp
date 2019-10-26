import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresarComponent } from './pages/usuario/ingresar/ingresar.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistrarseComponent } from './pages/usuario/registrarse/registrarse.component';
import { MiPerfilComponent } from './pages/usuario/mi-perfil/mi-perfil.component';
import { InfoComponent } from './pages/info/info.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { HacerDenunciaComponent } from './pages/denuncias/hacer-denuncia/hacer-denuncia.component';
import { ListaDenunciasComponent } from './pages/denuncias/lista-denuncias/lista-denuncias.component';
import { GenerarAlertaComponent } from './pages/noticias-alertas/generar-alerta/generar-alerta.component';
import { NoticiasComponent } from './pages/noticias-alertas/listado/noticias/noticias.component';
import { AlertasComponent } from './pages/noticias-alertas/listado/alertas/alertas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/ingresar',
    pathMatch: 'full'
  },

  // todos
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'mi-perfil',
    component: MiPerfilComponent
  },
  {
    path: 'ingresar',
    component: IngresarComponent
  },

  // pasajero
  {
    path: 'registrarse',
    component: RegistrarseComponent
  },
  {
    path: 'hacer-denuncia',
    component: HacerDenunciaComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: 'ayuda',
    component: AyudaComponent
  },
  {
    path: 'alertas',
    component: AlertasComponent
  },
  {
    path: 'noticias',
    component: NoticiasComponent
  },
  {
    path: 'horarios',
    component: HorariosComponent
  },

  // admin
  {
    // lista de denuncias (admin)
    path: 'lista-denuncias',
    component: ListaDenunciasComponent
  },
  {
    // generar alerta (admin y chofer)
    path: 'generar-alerta',
    component: GenerarAlertaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
