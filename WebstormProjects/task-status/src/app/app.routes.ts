import { Routes } from '@angular/router';
import { Home } from './home/home.component';
import { Login } from './login/login';
import { AuthGuard } from './login/auth-guard.service';
import {DocumentView} from './document/document';
import {TaskEditorView} from './taskeditor/taskeditor';

export const routes: Routes = [
  { path: '',       component: Home, canActivate: [AuthGuard] },
  { path: 'login',  component: Login },
  { path: 'home/:id',   component: Home, canActivate: [AuthGuard] },
  { path: 'document/:id',   component: DocumentView, canActivate: [AuthGuard] },
  { path: 'taskeditor/:parentId',   component: TaskEditorView, canActivate: [AuthGuard] },
  { path: '**',     component: Home, canActivate: [AuthGuard] },
];