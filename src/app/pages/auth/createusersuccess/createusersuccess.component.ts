import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-createusersuccess',
  templateUrl: './createusersuccess.component.html',
  styleUrls: ['./createusersuccess.component.css']
})
export class CreateusersuccessComponent implements OnInit {

  constructor(private router: Router,
    // service to parse all api calls
    private dataService: DataService,
    // service to handle all operations with local and session storage
    private storageService: StorageService, ) { }

  ngOnInit(): void {
  }

  public redirectToLogin() {
    this.router.navigateByUrl('login');
  }
 
}
