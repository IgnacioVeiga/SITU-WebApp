import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { InicioComponent } from './LEGACY/inicio/inicio.component';
import { MiPerfilComponent } from './LEGACY/usuario/mi-perfil/mi-perfil.component';
import { InfoComponent } from './LEGACY/info/info.component';
import { AyudaComponent } from './LEGACY/ayuda/ayuda.component';
import { NoticasAlertasModule } from './LEGACY/noticias-alertas/noticas-alertas.module';
import { HorariosComponent } from './LEGACY/horarios/horarios.component';
import { HacerDenunciaComponent } from './LEGACY/denuncias/hacer-denuncia/hacer-denuncia.component';
import { ListaDenunciasComponent } from './LEGACY/denuncias/lista-denuncias/lista-denuncias.component';

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
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AlertListComponent } from './pages/alert-list/alert-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { ReportListComponent } from './pages/report-list/report-list.component';
import { BusRoutesComponent } from './pages/bus-routes/bus-routes.component';
import { GenerateAlertComponent } from './dialogs/generate-alert/generate-alert.component';
import { AlertDetailsComponent } from './dialogs/alert-details/alert-details.component';
import { AddUserComponent } from './dialogs/add-user/add-user.component';
import { EditUserComponent } from './dialogs/edit-user/edit-user.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HacerDenunciaComponent,
    MiPerfilComponent,
    InfoComponent,
    AyudaComponent,
    ListaDenunciasComponent,
    HorariosComponent,
    LoginComponent,
    SignupComponent,
    AlertListComponent,
    UserListComponent,
    ReportListComponent,
    BusRoutesComponent,
    GenerateAlertComponent,
    AlertDetailsComponent,
    AddUserComponent,
    EditUserComponent,
    HomepageComponent,
    NavbarComponent,
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
