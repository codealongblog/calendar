import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { SwiperModule } from 'ngx-swiper-wrapper';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { TopbarComponent } from './components/topbar/topbar';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddEventDialogComponent } from './components/calendar/add.event.dialog/add.event.dialog';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HomeComponent } from './components/home/home.component';
import { ViewEventComponent } from './components/view.event/view.event.component';

import { UserService } from './services/user.service';
import { CalendarEventService } from './services/calendar.event.service';
import { FirebaseService } from './services/firebase.service';
import { AuthGuardService } from './services/auth.guard.service';
import { UserLoadGuardService } from './services/user.load.guard.service';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AddEventDialogComponent,
    DashboardComponent,
    HomeComponent,
    TopbarComponent,
    ViewEventComponent
  ],
  imports: [
    SwiperModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    AddEventDialogComponent
  ],
  providers: [
    UserService,
    CalendarEventService,
    FirebaseService,
    AuthGuardService,
    UserLoadGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
