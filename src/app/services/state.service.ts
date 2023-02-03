import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { StateShape } from '../shapes/state.shape';
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
export class StateService {
  error: any;
  private globalService: GlobalService;
  public config: Config;
  statesUrl = 'https://localhost:44374/state';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient, 
    httpErrorHandler: HttpErrorHandler,
    private router: Router) { 
      this.globalService = new GlobalService(http);
      this.globalService.getConfig()
      .subscribe(
        (data: Config) => { this.statesUrl = data.apiBaseUrl + data.statesUrl; 
        }, // success path
        error => this.error = error // error path
      );

      //console.log(this.statesUrl);
      this.handleError = httpErrorHandler.createHandleError('StateService');
    }

  /** GET and Search Methods */
  StateGetAll (): Observable<StateShape[]> {

    return this.http.get<StateShape[]>(this.statesUrl)
      .pipe(
        catchError(this.handleError('StateGetAll', []))
      );
  }

  StateGet(StateNo: string): Observable<StateShape> {
    StateNo = StateNo.trim();
    const url = this.statesUrl + '/' + StateNo; // GET /state/42

    return this.http.get<StateShape>(url)
      .pipe(
        catchError(this.handleError<StateShape>('StateGet'))
      );
  }

}