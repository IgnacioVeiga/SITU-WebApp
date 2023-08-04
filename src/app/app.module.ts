import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';

import { LoginComponent } from './pages/home/login/login.component';
import { SignupComponent } from './pages/home/signup/signup.component';
import { AlertListComponent } from './pages/alerts/list/alert-list.component';
import { UserListComponent } from './pages/users/list/user-list.component';
import { ReportListComponent } from './pages/reports/list/report-list.component';
import { ReportDetailsComponent } from './pages/reports/details/report-details.component';
import { BusRoutesComponent } from './pages/bus-routes/bus-routes.component';
import { CreateAlertComponent } from './pages/alerts/create/create-alert.component';
import { AlertDetailsComponent } from './pages/alerts/details/alert-details.component';
import { AfterRegistrationComponent } from './dialogs/after-registration/after.registration.component';
import { AddUserComponent } from './pages/users/add/add-user.component';
import { EditUserComponent } from './pages/users/edit/edit-user.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmLogoutComponent } from './dialogs/confirm-logout/confirm-logout.component';
import { EditMyUserComponent } from './pages/users/edit-my-user/edit-my-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AlertListComponent,
    UserListComponent,
    ReportListComponent,
    ReportDetailsComponent,
    BusRoutesComponent,
    CreateAlertComponent,
    AlertDetailsComponent,
    AfterRegistrationComponent,
    AddUserComponent,
    EditUserComponent,
    EditMyUserComponent,
    NavbarComponent,
    ConfirmLogoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatMenuModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatToolbarModule,

    MatListModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    })
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
