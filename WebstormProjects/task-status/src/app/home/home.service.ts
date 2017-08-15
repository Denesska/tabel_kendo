import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { OcpDocument } from "app/models/ocp.model";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HomeService {
    baseUrl: string = environment.baseUrl;
    access_token: string;
    headers: Headers;

    constructor(private http: Http) {
        this.access_token = localStorage.getItem('access_token');
        this.headers = new Headers();
        this.headers.append('Authorization', `Bearer ${this.access_token}`);
    }

    getNodeChildren = (id: number) : Observable<OcpDocument[]> => {
        const childrenUrl = `${this.baseUrl}/Documents/${id}/Children?documentFormat=Ocp&loadHierarchyType=Tree`;
        return this.http.get(childrenUrl, { headers: this.headers }).map(this.extractData).catch(this.handleError);
    }

    getNodeInformation = (id: number) : Observable<OcpDocument>=> {
        const documentUrl = `${this.baseUrl}/Documents/${id}?documentFormat=Ocp`;
        return this.http.get(documentUrl, { headers: this.headers }).map(this.extractData).catch(this.handleError);
    }

    getCurrentWorkStatus = () => {
        const currentWorkUrl = `${this.baseUrl}/TaskManager/Users/LoggedUser/CurrentWork`;
        return this.http.get(currentWorkUrl, { headers: this.headers }).map(this.extractData).catch(this.handleError);
    }

    getWorkStats = (year, month) => {
        const workStatsUrl = `${this.baseUrl}/TaskManager/Users/LoggedUser/Work/Statistics?year=${year}&month=${month}`;
        return this.http.get(workStatsUrl, { headers: this.headers }).map(this.extractData).catch(this.handleError);
    }

    startWorking = (id: number) : Observable<any> => {
        const startWorkingUrl = `${this.baseUrl}/TaskManager/Users/LoggedUser/Work/Status/Working?taskId=${id}&workLocation=Work&workType=Programming&stopIfAlreadyStarted=true`;
        return this.http.post(startWorkingUrl, {}, { headers: this.headers }).map(this.extractData).catch(this.handleError);
    }

    stopWorking = () => {
        const stopWorkingUrl = `${this.baseUrl}/TaskManager/Users/LoggedUser/Work/Status/Stopped?workLocation=Work&workDescription=&workType=Programming`;
        return this.http.post(stopWorkingUrl, {}, { headers: this.headers }).map(this.extractData).catch(this.handleError);
    }
    
    private extractData = (res: Response) => {
        let body = res.json();
        return body || {};
    }

    private handleError = (err : Response | any) => {
        return Observable.throw(err);
    }
}