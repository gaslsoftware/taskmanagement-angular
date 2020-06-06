import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';
import { ApiConstants } from 'src/app/constants/api-constants';
import { LoginDetails } from 'src/app/models/login-details';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  alert: any;
  type: string;
  error: string;
  constructor(private router: Router,
    // service to parse all api calls
    private dataService: DataService,
    // service to handle all operations with local and session storage
    private storageService: StorageService, ) { }

  ngOnInit(): void {
  }

  public login() {
    console.log('login clicked');
    const data = new LoginDetails(
      this.username,
      this.password
    );
    this.dataService.parseApiCall(ApiConstants.URL.LOGIN, 'post', data, ApiConstants.COMMON_HEADER)
      .subscribe(res => {
        if(res['jwt'] != null)
        {
        const currentTimeStamp = Math.floor(new Date().getTime() / 1000.0);
        //const time = currentTimeStamp + res['expires_in'];
        console.log(res);
        console.log(res['jwt']);
        this.storageService.setSessionStorage('accessToken', res['jwt']);
        // this.storageService.setSessionStorage('refresh_token', res['refresh_token']);
        // this.storageService.setSessionStorage('expirein', time);
        this.router.navigateByUrl('dashboard');
        }
      }, (err: HttpErrorResponse) => {
        //   this.buttonClickStatus = true;
        console.log(err.status);
        if (err.status === 401) {
          this.type = 'danger'
          this.error = 'Invalid username or password';
          setTimeout(() => this.error = null, 5000);
        } else {
          this.type = 'danger';
          this.error = 'Something went wrong';
          setTimeout(() => this.error = null, 5000);
        }
      });
  }
}
