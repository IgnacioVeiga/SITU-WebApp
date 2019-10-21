import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './inicio/inicio.component';
import { IngresarComponent } from './pages/usuario/ingresar/ingresar.component';
import { RegistrarseComponent } from './pages/usuario/registrarse/registrarse.component';
import { MiPerfilComponent } from './pages/usuario/mi-perfil/mi-perfil.component';
import { InfoComponent } from './pages/info/info.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { NoticasAlertasModule } from './pages/noticias-alertas/noticas-alertas.module';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from '@angular/material';
import { HacerDenunciaComponent } from './pages/denuncias/hacer-denuncia/hacer-denuncia.component';
import { ListaDenunciasComponent } from './pages/denuncias/lista-denuncias/lista-denuncias.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    IngresarComponent,
    RegistrarseComponent,
    HacerDenunciaComponent,
    MiPerfilComponent,
    InfoComponent,
    AyudaComponent,
    ListaDenunciasComponent,
    HorariosComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoticasAlertasModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
