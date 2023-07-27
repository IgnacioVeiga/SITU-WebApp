import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { ToastrModule } from 'ngx-toastr';

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
import { ConfirmLogoutComponent } from './dialogs/confirm-logout/confirm-logout.component';

@NgModule({
  declarations: [
    AppComponent,
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
    ConfirmLogoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatToolbarModule,

    MatListModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    }),

    
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
