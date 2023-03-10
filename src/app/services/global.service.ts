import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
  appBaseUrl: string,
  apiBaseUrl: string,
  companiesUrl: string;
  contactsUrl: string;
  projectsUrl: string;
  jobsUrl: string;
  statesUrl: string;
  categorysUrl: string;
  citysUrl: string;
  rolesUrl: string;
  titlesUrl: string;
}

@Injectable()
export class GlobalService
{
  configUrl = '../../assets/config.json';

  constructor (private http: HttpClient) {
    
  }

  getConfig() {
    return this.http.get<Config>(this.configUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  ServerType(): string 
  {
       //return 'Production';
       return 'Staging';
       //return "Development";
  }

  GetServiceBaseUrl(): string
  {
    var serviceBaseUrl = "http://localhost:4200";

    if (this.ServerType() == 'Production')
    {

    }
    else if (this.ServerType() == 'Staging')
    {

    }
    else 
    {

    }
    return serviceBaseUrl;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}