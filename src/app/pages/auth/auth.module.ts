import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { CreateusersuccessComponent } from './createusersuccess/createusersuccess.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent,CreateusersuccessComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    
  ]
})
export class AuthModule { }
