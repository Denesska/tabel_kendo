import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';


@Injectable()
export class TaskEditorService {
    baseUrl: string = environment.baseUrl;
    access_token: string;
    headers: Headers;
    constructor(private http: Http) {
        this.access_token = localStorage.getItem('access_token');
        this.headers = new Headers();
        this.headers.append('Authorization', `Bearer ${this.access_token}`);
    }

    saveTask = (body): Observable<any> => {
        return this.http.post(`${this.baseUrl}/Documents`, body, { headers: this.headers })
            .map((res) => res.json());
    }
}