import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopbarComponent } from './components/topbar/topbar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { AddEventDialogComponent } from './components/calendar/add.event.dialog/add.event.dialog';



import { UserService } from './services/user.service';
import { CalendarEventService } from './services/calendar.event.service';
import { TimeSelectorComponent } from './components/calendar/time.selector/time.selector';
import { FirebaseService } from './services/firebase.service';
import { AuthGuardService } from './services/auth.guard.service';
import { ViewEventComponent } from './components/view.event/view.event.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AddEventDialogComponent,
    DashboardComponent,
    HomeComponent,
    TopbarComponent,
    TimeSelectorComponent,
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
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
