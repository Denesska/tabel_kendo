import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';


@Injectable()
export class DocumentViewService {
    baseUrl: string = environment.baseUrl;
    access_token: string;
    headers: Headers;
    constructor(private http: Http) {
        this.access_token = localStorage.getItem('access_token');
        this.headers = new Headers();
        this.headers.append('Authorization', `Bearer ${this.access_token}`);
    }

    getDocumentFields(id): Observable<any> {
        return this.http.get(`${this.baseUrl}/Documents/${id}`, { headers: this.headers })
            .map((res) => res.json());
    }

    startWorking(id: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/TaskManager/Users/LoggedUser/Work/Status/Working?taskId=${id}&workLocation=Work&workType=Programming&stopIfAlreadyStarted=true`, {},
            { headers: this.headers })
            .map((res) => res.json())
    }

    stopWorking(): Observable<any> {
        return this.http.post(`${this.baseUrl}/TaskManager/Users/LoggedUser/Work/Status/Stopped?workLocation=Work&workDescription=&workType=Programming`, {},
            { headers: this.headers })
            .map((res) => res.json())
    }

    createSwitchOption(taskName: string, taskId: number): Observable<any> {
        const url = `${this.baseUrl}/TaskManager/Users/LoggedUser/SwitchOptions`
        const body = {
            "Id": 0,
            "Name": taskName,
            "TaskId": taskId
        };

        return this.http.post(url, body, { headers: this.headers })
            .map((res) => res.json());
    }
}