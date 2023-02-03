import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// out of the box test components
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './components/home.component';
import { CounterComponent } from './components/counter.component';
import { FetchDataComponent } from './components/fetch-data.component';

// custom components
import { CompanyComponent } from './components/companys.component';
import { CompanyAddComponent } from './components/companyAdd.component';
import { CompanyEditComponent } from './components/companyEdit.component';

import { ContactComponent } from './components/contacts.component';
import { ContactAddComponent } from './components/contactAdd.component';
import { ContactEditComponent } from './components/contactEdit.component';

import { ProjectComponent } from './components/projects.component';
import { ProjectAddComponent } from './components/projectAdd.component';
import { ProjectEditComponent } from './components/projectEdit.component';

import { JobComponent } from './components/jobs.component';
import { JobAddComponent } from './components/jobAdd.component';
import { JobEditComponent} from './components/jobEdit.component';

import { HttpClientXsrfModule } from '@angular/common/http';

import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { MessagesComponent }    from './components/messages.component';
import { RequestCache, RequestCacheWithMap } from './services/request-cache.service';
import { AuthService } from './services/auth.service'

import { httpInterceptorProviders } from './http-interceptors/index';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    MessagesComponent,
    CompanyComponent,
    CompanyAddComponent,
    CompanyEditComponent,
    ContactComponent,
    ContactAddComponent,
    ContactEditComponent,
    ProjectComponent,
    ProjectAddComponent,
    ProjectEditComponent,
    JobComponent,
    JobAddComponent,
    JobEditComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'company', component: CompanyComponent },
      { path: 'companyAdd', component: CompanyAddComponent },
      { path: 'companyEdit', component: CompanyEditComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'contactAdd', component: ContactAddComponent },
      { path: 'contactEdit', component: ContactEditComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'projectAdd', component: ProjectAddComponent },
      { path: 'projectEdit', component: ProjectEditComponent },
      { path: 'job', component: JobComponent },
      { path: 'jobAdd', component: JobAddComponent },
      { path: 'jobEdit', component: ProjectAddComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [
    AuthService,
    HttpErrorHandler,
    MessageService,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
