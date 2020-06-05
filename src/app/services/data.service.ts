import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { Observable, of } from 'rxjs';
import { ApiConstants } from '../constants/api-constants';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient,
  private router: Router,
  private storageService: StorageService) { }

  public parseApiCall(url: string, method: string, data: any, header: any): Observable<any> { 
    switch (method) {
      case 'get':
        return this.http.get(url, header);
          // .pipe(
          //   catchError(this.handleError('get', []))
          // );

          case 'post':
            return this.http.post(url, data, header).pipe(
                catchError(
                
                  this.handleError('post', []))
              );

      case 'put':
        return this.http.put(url, data, header);
          // .pipe(
          //   catchError(this.handleError('put', []))
          // );

      case 'delete':
        return this.http.delete(url, header);
          // .pipe(
          //   catchError(this.handleError('delete', []))
          // );

      default:
        console.error('Invalid method');
        break;
    }
  }

  public isResponseStatusSuccess(response): boolean {
    return response['Response']['Status']['statusCode'] === ApiConstants.STATUS_CODES.SUCCESS;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      
      try {
        console.log(error.status);
        if (error.status === ApiConstants.STATUS_CODES.AUTH_ERROR) {
          this.handleAuthError();
        }
      } catch (error) {}
      // TODO: better job of transforming error for user consumption
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public handleAuthError() {
    console.log("error handle");
    this.storageService.setSessionStorage('accessToken', null);
    this.storageService.clearSessionStorage();
    this.router.navigateByUrl('login');
  }

  refreshToken() {
    console.log('refresh')
    // append refresh token if you have one
    const refreshToken = this.storageService.getSessionStorage('refresh_token');
    const expiredToken = this.storageService.getSessionStorage('access_token');
    this.parseApiCall(ApiConstants.URL.LOGIN, 'post',  {
      client_id: 'kidsbuddy',
      client_secret: 'qwe@123',
      grant_type: 'refresh_token',
      refresh_token: String(this.storageService.getSessionStorage('refresh_token')),
      app_id: Number(this.storageService.getLocalStorage('appId')),
      type: 24,
      content_app_id: 1
    },
    ApiConstants.COMMON_HEADER).subscribe(res => {
      const currentTimeStamp = Math.floor(new Date().getTime()/1000.0);
      const time = currentTimeStamp + res['expires_in'];
      this.storageService.setSessionStorage('access_token', res['access_token']);
      this.storageService.setSessionStorage('expirein', time);
    });
  }

  deriveRefreshToken() {
    console.log('refresh')
    // append refresh token if you have one
    const refreshToken = this.storageService.getSessionStorage('refresh_token_derived');
    const expiredToken = this.storageService.getSessionStorage('access_token_derived');
    this.parseApiCall(ApiConstants.URL.LOGIN, 'post',  {
      client_id: 'baashaa',
      client_secret: 'qwe@123',
      grant_type: 'refresh_token',
      refresh_token: String(this.storageService.getSessionStorage('refresh_token_derived')),
      app_id: Number(this.storageService.getLocalStorage('SubOrg_appId')),
      type: 28,
      content_app_id: 1
    },
    ApiConstants.COMMON_HEADER).subscribe(res => {
      const currentTimeStamp = Math.floor(new Date().getTime()/1000.0);
      const time = currentTimeStamp + res['expires_in'];
      this.storageService.setSessionStorage('access_token_derived', res['access_token']);
      this.storageService.setSessionStorage('derive_expirein', time);
    });
  }
}
