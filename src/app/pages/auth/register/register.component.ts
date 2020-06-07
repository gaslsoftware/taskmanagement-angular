import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserDetails } from 'src/app/models/user-details';
import { ApiConstants } from 'src/app/constants/api-constants';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: any;
  password: any;
  fullname: any;
  emailaddress: string;
  phonenumber:number;
  registerError:any;


  constructor(private router: Router,
    // service to parse all api calls
    private dataService: DataService,
    // service to handle all operations with local and session storage
    private storageService: StorageService,) { }

  ngOnInit(): void {
  }

  public register () {
    const data = new UserDetails(
      this.username,
      this.password,
      this.emailaddress,
      this.phonenumber
    );
    console.log("Register button clicked")
    this.dataService.parseApiCall(ApiConstants.URL.REGISTER, 'post', data, ApiConstants.COMMON_HEADER)
    .subscribe(res => {
      console.log(res);
      if(res['hasError'] != null)
      {
        let hasError:Boolean = res['hasError'];
        if(!hasError) {
          this.router.navigateByUrl('success');
        }
        else {
          this.registerError = res['message'];
        }
      
      }
      else {
    
        } 
    }, (err: HttpErrorResponse) => {
      //   this.buttonClickStatus = true;
      console.log(err.status);
      console.log("Something went wrong1");
      if (err.status === 401 || err.status === 403) {

      } else {

      }
    });
  }
  public redirectToLogin() {
    this.router.navigateByUrl('login');
  }
}

