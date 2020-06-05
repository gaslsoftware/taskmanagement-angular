import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public setSessionStorage(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  public setLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getSessionStorage(key: string) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  public getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  public isKeyExistInLocal(key: string) {
    return localStorage.getItem(key) != null && localStorage.getItem(key) != 'null';
  }

  public isKeyExistInSession(key: string) {
    return sessionStorage.getItem(key) != null &&  localStorage.getItem(key) != 'null';
  }

  public clearSessionStorage () {
    sessionStorage.clear();
    localStorage.clear();
  }

  // public getTokenHeader() {
  //   const tokenHeader = {
  //     // tslint:disable-next-line:max-line-length
  //     headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'phoneId': String(this.getSessionStorage('phoneId')), 'organizationId': String(this.getSessionStorage('organizationId')), 'token': this.getSessionStorage('token'), 'customerId': '9' })
  //   };
  //   return tokenHeader;
  // }

  public getTokenHeader() {
    const tokenHeader = {
      // tslint:disable-next-line:max-line-length
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + this.getSessionStorage('accessToken'),
        'Origin': 'http://localhost:8080',
        'authExempt': 'false'
       })
    };
    return tokenHeader;
  }


  public getMediaTokenHeader() {
    const tokenHeader = {
      // tslint:disable-next-line:max-line-length
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + this.getSessionStorage('accessToken'),
        'Origin': 'http://localhost:8080',
        'authExempt': 'false'
       })
    };
    return tokenHeader;
  }
}
