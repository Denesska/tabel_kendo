import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SharedService {
  baseUrl = environment.baseUrl;

  // Observable string sources
  private updateUserNameSource = new Subject<any>();
  private updateWorkingStatusSource = new Subject<any>();
  private updateWorkStatisticsSource = new Subject<any>();
  // Observable string streams
  userNameEmitted$ = this.updateUserNameSource.asObservable();
  workingStatusEmitted$ = this.updateWorkingStatusSource.asObservable();
  workStatisticsEmitted$ = this.updateWorkStatisticsSource.asObservable();

  constructor(private http: Http, private router: Router) {
  }

  // Service message commands
  updateUserName(change: any) {
    this.updateUserNameSource.next(change);
  }

  updateWorkingStatus(task) {
    this.updateWorkingStatusSource.next(task);
  }

  updateWorkStatistics(statistics) {
    this.updateWorkStatisticsSource.next(statistics);
  }

  logout() {
    const access_token = localStorage.getItem('access_token');
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', `Bearer ${access_token}`);

    return this.http.post(`${this.baseUrl}/Account/Logout`, {}, {headers: headers});
  }
}
