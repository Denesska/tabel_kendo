import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';

import 'hammerjs';

import { SharedService } from './app.service';
import { DocumentViewService } from './document/document.service';
import { TaskEditorService } from './taskeditor/taskeditor.service';
import { AuthenticatedHttpService } from './login/auth-http.service';

import { Login } from './login/login';
import { Home } from './home/home.component';
import { DocumentView } from './document/document';
import {TaskEditorView} from './taskeditor/taskeditor';
import { AppComponent } from './app.component';

import { AuthGuard } from './login/auth-guard.service';

import { routes } from './app.routes';



@NgModule({
  declarations: [
    AppComponent, Login, Home, DocumentView, TaskEditorView
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    MaterialModule
  ],
  providers: [SharedService, DocumentViewService, TaskEditorService, AuthGuard, { provide: Http, useClass: AuthenticatedHttpService }],
  bootstrap: [AppComponent]
})

export class AppModule { }
