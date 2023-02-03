import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { CityShape } from '../shapes/city.shape';
import { Config, GlobalService } from './global.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root',
})
export class CityService {
  error: any;
  private globalService: GlobalService;
  public config: Config;
  citysUrl = 'https://localhost:44374/city';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient, 
    httpErrorHandler: HttpErrorHandler,
    private router: Router) { 
      this.globalService = new GlobalService(http);
      this.globalService.getConfig()
      .subscribe(
        (data: Config) => { this.citysUrl = data.apiBaseUrl + data.citysUrl; 
        }, // success path
        error => this.error = error // error path
      );

      //console.log(this.statesUrl);
      this.handleError = httpErrorHandler.createHandleError('CityService');
    }

  /** GET and Search Methods */
  CityGetAll (): Observable<string[]> {

    return this.http.get<string[]>(this.citysUrl)
      .pipe(
        catchError(this.handleError('CityGetAll', []))
      );
  }

  /*
   CityGetAll (): Observable<CityShape[]> {

    return this.http.get<CityShape[]>(this.citysUrl)
      .pipe(
        catchError(this.handleError('CityGetAll', []))
      );
  }
  */

  CityGet(CityNo: string): Observable<CityShape> {
    CityNo = CityNo.trim();
    const url = this.citysUrl + '/' + CityNo; // GET /city/42

    return this.http.get<CityShape>(url)
      .pipe(
        catchError(this.handleError<CityShape>('CityGet'))
      );
  }

}