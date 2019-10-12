import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { MyProfileComponent } from './pages/user/my-profile/my-profile.component';
import { InfoComponent } from './pages/info/info.component';
import { HelpComponent } from './pages/help/help.component';
import { AlertsComponent } from './pages/alerts/list/alerts.component';
import { AlertsModule } from './pages/alerts/alerts.module';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { CreateComplaintComponent } from './pages/complaints/create-complaint/create-complaint.component';
import { ComplaintsComponent } from './pages/complaints/list/complaints.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CreateComplaintComponent,
    MyProfileComponent,
    InfoComponent,
    HelpComponent,
    AlertsComponent,
    ComplaintsComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AlertsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
