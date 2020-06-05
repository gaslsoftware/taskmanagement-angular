import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


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
  path: '',
  component: MainComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      // canActivate: [AuthGuardService]
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
