import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { InicioComponent } from './inicio/inicio.component';
import { IngresarComponent } from './pages/usuario/ingresar/ingresar.component';
import { RegistrarseComponent } from './pages/usuario/registrarse/registrarse.component';
import { MiPerfilComponent } from './pages/usuario/mi-perfil/mi-perfil.component';
import { InfoComponent } from './pages/info/info.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { NoticasAlertasModule } from './pages/noticias-alertas/noticas-alertas.module';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { HacerDenunciaComponent } from './pages/denuncias/hacer-denuncia/hacer-denuncia.component';
import { ListaDenunciasComponent } from './pages/denuncias/lista-denuncias/lista-denuncias.component';

import { ToastrModule } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

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

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatToolbarModule,
    
    MatListModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
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
