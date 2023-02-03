import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { ProjectShape } from '../shapes/project.shape';
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
export class ProjectService {
  error: any;
  private globalService: GlobalService;
  public config: Config;
  projectsUrl = 'https://localhost:44374/project';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient, 
    httpErrorHandler: HttpErrorHandler,
    private router: Router) { 
      this.globalService = new GlobalService(http);
      this.globalService.getConfig()
      .subscribe(
        (data: Config) => { this.projectsUrl = data.apiBaseUrl + data.projectsUrl; 
        }, // success path
        error => this.error = error // error path
      );

      //console.log(this.projectsUrl);
      this.handleError = httpErrorHandler.createHandleError('ProjectService');
    }

  /** GET and Search Methods */
  ProjectGetAll (): Observable<ProjectShape[]> {

    return this.http.get<ProjectShape[]>(this.projectsUrl)
      .pipe(
        catchError(this.handleError('ProjectGetAll', []))
      );
  }

  ProjectGet(ProjectId: string): Observable<ProjectShape> {
    ProjectId = ProjectId.trim();
    const url = this.projectsUrl + '/' + ProjectId; // GET /project/42

    return this.http.get<ProjectShape>(url)
      .pipe(
        catchError(this.handleError<ProjectShape>('ProjectGet'))
      );
  }

  //////// Save methods //////////
  ProjectInsert (project: ProjectShape): Observable<ProjectShape> {
    return this.http.post<ProjectShape>(this.projectsUrl, project, httpOptions)
      .pipe(
        catchError(this.handleError('ProjectInsert', project))
      );
  }

  ProjectUpdate(project: ProjectShape): Observable<ProjectShape> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<ProjectShape>(this.projectsUrl, project, httpOptions)
      .pipe(
        catchError(this.handleError('ProjectUpdate', project))
      );
  }

  /* DELETE: delete the project from the server */
  ProjectDelete (ProjectId: number): Observable<{}> {
    const url = '${this.projectsUrl}/${ProjectId}'; // DELETE /project/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('ProjectDelete'))
      );
  }

}