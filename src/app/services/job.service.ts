import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { JobShape } from '../shapes/job.shape';
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
export class JobService {
  error: any;
  private globalService: GlobalService;
  public config: Config;
  jobsUrl = 'https://localhost:44374/job';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient, 
    httpErrorHandler: HttpErrorHandler,
    private router: Router) { 
      this.globalService = new GlobalService(http);
      this.globalService.getConfig()
      .subscribe(
        (data: Config) => { this.jobsUrl = data.apiBaseUrl + data.jobsUrl; 
        }, // success path
        error => this.error = error // error path
      );

      //console.log(this.jobsUrl);
      this.handleError = httpErrorHandler.createHandleError('JobService');
    }

  /** GET and Search Methods */
  JobGetAll (): Observable<JobShape[]> {

    return this.http.get<JobShape[]>(this.jobsUrl)
      .pipe(
        catchError(this.handleError('JobGetAll', []))
      );
  }

  JobGet(JobId: string): Observable<JobShape> {
    JobId = JobId.trim();
    const url = this.jobsUrl + '/' + JobId; // GET /job/42

    return this.http.get<JobShape>(url)
      .pipe(
        catchError(this.handleError<JobShape>('JobGet'))
      );
  }

  //////// Save methods //////////
  JobInsert (job: JobShape): Observable<JobShape> {
    return this.http.post<JobShape>(this.jobsUrl, job, httpOptions)
      .pipe(
        catchError(this.handleError('JobInsert', job))
      );
  }

  JobUpdate(job: JobShape): Observable<JobShape> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<JobShape>(this.jobsUrl, job, httpOptions)
      .pipe(
        catchError(this.handleError('JobUpdate', job))
      );
  }

  /* DELETE: delete the job from the server */
  JobDelete (JobId: number): Observable<{}> {
    const url = '${this.jobsUrl}/${JobId}'; // DELETE /job/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('JobDelete'))
      );
  }

}