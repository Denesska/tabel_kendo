import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './app.service'
import { Home } from './home/home.component'
import { environment } from '../environments/environment';

@Component({
  selector: 'auth-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string = 'Omanager';
  userName: string;
  currentTask: any = {};
  version: string = environment.version;
  statistics: any = {};

  constructor(public router: Router, private _sharedService: SharedService) {
    _sharedService.userNameEmitted$.subscribe(username => this.userName = username);
    _sharedService.workingStatusEmitted$.subscribe(task => {
      if (task !== null) {
        this.currentTask.TaskTitle = task.TaskTitle;
        this.currentTask.StartDate = new Date(task.StartDate);
      } else {
        this.currentTask.TaskTitle = 'Not working';
      }
    });
    _sharedService.workStatisticsEmitted$.subscribe(statistics => this.statistics = statistics);
  }

  logout(): void {
    this._sharedService.logout().subscribe(
      data => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('username');
        this.router.navigate(['login']);
      },
      error => {
        alert(error.text());
      }
    );
  }
}
