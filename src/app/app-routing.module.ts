import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CreateusersuccessComponent } from './pages/auth/createusersuccess/createusersuccess.component';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: '/login'
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'success',
  component: CreateusersuccessComponent
},
{
  path: '',
  component: MainComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuardService]
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
