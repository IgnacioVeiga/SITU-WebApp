import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresarComponent } from './pages/usuario/ingresar/ingresar.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistrarseComponent } from './pages/usuario/registrarse/registrarse.component';
import { MiPerfilComponent } from './pages/usuario/mi-perfil/mi-perfil.component';
import { InfoComponent } from './pages/info/info.component';
import { AyudaComponent } from './pages/ayuda/help.component';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { HacerDenunciaComponent } from './pages/denuncias/hacer-denuncia/hacer-denuncia.component';
import { ListaDenunciasComponent } from './pages/denuncias/lista-denuncias/lista-denuncias.component';
import { GenerarAlertaComponent } from './pages/noticias-alertas/generar-alerta/generar-alerta.component';
import { NoticiasAlertasComponent } from './pages/noticias-alertas/listado/noticias-alertas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/ingresar',
    pathMatch: 'full'
  },

  // todos
  {
    // inicio (todos)
    path: 'inicio',
    component: InicioComponent
  },
  {
    // mi perfil (todos)
    path: 'mi-perfil',
    component: MiPerfilComponent
  },
  {
    // ingresar (todos)
    path: 'ingresar',
    component: IngresarComponent
  },

  // pasajero
  {
    // registrar (pasajero)
    path: 'registrarse',
    component: RegistrarseComponent
  },
  {
    // denunciar (pasajero)
    path: 'hacer-denuncia',
    component: HacerDenunciaComponent
  },
  {
    // información (pasajero)
    path: 'info',
    component: InfoComponent
  },
  {
    // ayuda (pasajero)
    path: 'ayuda',
    component: AyudaComponent
  },
  {
    // noticias o alertas (pasajero)
    path: 'noticias-alertas',
    component: NoticiasAlertasComponent
  },
  {
    // horarios (pasajero)
    path: 'horarios',
    component: HorariosComponent
  },

  // admin
  {
    // lista de incidencias (admin)
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
