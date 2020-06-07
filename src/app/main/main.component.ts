import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private storageService: StorageService,private router: Router) { }
  username:string;
  ngOnInit(): void {
    this.username=this.storageService.getLocalStorage('username');
  }

  public logout()
  {
    this.storageService.setSessionStorage('accessToken', null);
    this.storageService.clearSessionStorage();
    this.router.navigateByUrl('login');
  }
}
