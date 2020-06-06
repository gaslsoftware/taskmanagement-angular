import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor( private storageService: StorageService,
    private router: Router) { }

    canActivate(): boolean {
      if (!this.storageService.isKeyExistInSession('accessToken')) {
        this.router.navigateByUrl('login');
        return false;
      }
      return true;
    }
}
