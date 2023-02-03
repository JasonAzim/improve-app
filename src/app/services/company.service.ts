import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { CompanyShape } from '../shapes/company.shape';
import { GlobalService, Config } from './global.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  error: any;
  private globalService: GlobalService;
  public config: Config;
  private useConfig = true;
  companiesUrl = 'https://localhost:44374/company';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient, 
    httpErrorHandler: HttpErrorHandler,
    private router: Router) { 
      this.globalService = new GlobalService(http);
      this.globalService.getConfig()
      .subscribe(
        (data: Config) => {
          if (this.useConfig) { this.companiesUrl = data.apiBaseUrl + data.companiesUrl}; 
        }, // success path
        error => this.error = error // error path
      );

      //console.log(this.companiesUrl);
      this.handleError = httpErrorHandler.createHandleError('CompanyService');
    }

  /** GET and Search Methods */
  CompanyGetAll (): Observable<CompanyShape[]> {

    return this.http.get<CompanyShape[]>(this.companiesUrl)
      .pipe(
        catchError(this.handleError('CompanyGetAll', []))
      );
  }

  CompanyGet(CompanyId: string): Observable<CompanyShape> {
    CompanyId = CompanyId.trim();
    const url = this.companiesUrl + '/' + CompanyId; // GET /company/42

    return this.http.get<CompanyShape>(url)
      .pipe(
        catchError(this.handleError<CompanyShape>('CompanyGet'))
      );
  }

  //////// Save methods //////////
  CompanyInsert (company: CompanyShape): Observable<CompanyShape> {
    return this.http.post<CompanyShape>(this.companiesUrl, company, httpOptions)
      .pipe(
        catchError(this.handleError('CompanyInsert', company))
      );
  }

  CompanyUpdate(company: CompanyShape): Observable<CompanyShape> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<CompanyShape>(this.companiesUrl, company, httpOptions)
      .pipe(
        catchError(this.handleError('CompanyUpdate', company))
      );
  }

  /* DELETE: delete the company from the server */
  CompanyDelete (CompanyId: number): Observable<{}> {
    const url = '${this.companiesUrl}/${CompanyId}'; // DELETE api/company/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('CompanyDelete'))
      );
  }

}