import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { ContactShape } from '../shapes/contact.shape';
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
export class ContactService {
  error: any;
  private globalService: GlobalService;
  public config: Config;
  contactsUrl = 'https://localhost:44374/contact';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient, 
    httpErrorHandler: HttpErrorHandler,
    private router: Router) { 
      this.globalService = new GlobalService(http);
      this.globalService.getConfig()
      .subscribe(
        (data: Config) => { this.contactsUrl = data.apiBaseUrl + data.contactsUrl; 
        }, // success path
        error => this.error = error // error path
      );

      //console.log(this.contactsUrl);
      this.handleError = httpErrorHandler.createHandleError('ContactService');
    }

  /** GET and Search Methods */
  ContactGetAll (): Observable<ContactShape[]> {

    return this.http.get<ContactShape[]>(this.contactsUrl)
      .pipe(
        catchError(this.handleError('ContactGetAll', []))
      );
  }

  ContactGet(ContactId: string): Observable<ContactShape> {
    ContactId = ContactId.trim();
    const url = this.contactsUrl + '/' + ContactId; // GET /contact/42

    return this.http.get<ContactShape>(url)
      .pipe(
        catchError(this.handleError<ContactShape>('ContactGet'))
      );
  }

  //////// Save methods //////////
  ContactInsert (contact: ContactShape): Observable<ContactShape> {
    return this.http.post<ContactShape>(this.contactsUrl, contact, httpOptions)
      .pipe(
        catchError(this.handleError('ContactInsert', contact))
      );
  }

  ContactUpdate(contact: ContactShape): Observable<ContactShape> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<ContactShape>(this.contactsUrl, contact, httpOptions)
      .pipe(
        catchError(this.handleError('ContactUpdate', contact))
      );
  }

  /* DELETE: delete the contact from the server */
  ContactDelete (ContactId: number): Observable<{}> {
    const url = '${this.contactsUrl}/${ContactId}'; // DELETE /contact/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('ContactDelete'))
      );
  }

}