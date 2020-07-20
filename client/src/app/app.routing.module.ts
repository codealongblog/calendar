import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { DashboardComponent } from './components/dashboard/dashboard';
import { AuthGuardService } from './services/auth.guard.service';
import { ViewEventComponent } from './components/view.event/view.event';
import { UserLoadGuardService } from './services/user.load.guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'view/:id', component: ViewEventComponent, canActivate: [UserLoadGuardService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
