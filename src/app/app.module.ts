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
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatPaginatorModule } from '@angular/material';
import { HacerDenunciaComponent } from './pages/denuncias/hacer-denuncia/hacer-denuncia.component';
import { ListaDenunciasComponent } from './pages/denuncias/lista-denuncias/lista-denuncias.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AppService } from './app.service';

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
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoticasAlertasModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      tapToDismiss: true,
      closeButton: true
    }),
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
