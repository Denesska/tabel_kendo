import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Http, Headers} from '@angular/http';
import {Location} from '@angular/common';
import {SharedService} from '../app.service';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {HomeService} from './home.service';
import {OcpDocument} from '../models/ocp.model';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  providers: [HomeService]
})

export class Home implements OnInit {
  access_token: string;
  baseUrl: string = environment.baseUrl;
  docObjects = new Array<OcpDocument>();
  currentTask: any = {};
  parentTask: OcpDocument = new OcpDocument();
  switchOptions = [];
  showLoader: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private http: Http,
              private _sharedService: SharedService,
              private homeService: HomeService,
              public snackBar: MdSnackBar) {

    this.access_token = localStorage.getItem('access_token');

    this._sharedService.updateUserName(localStorage.getItem('username'));

    this._sharedService.workingStatusEmitted$.subscribe(task => {
      if (task !== null) {
        this.currentTask.TaskTitle = task.TaskTitle;
        this.currentTask.StartDate = new Date(task.StartDate);
      } else {
        this.currentTask.TaskTitle = 'Not working';
      }
    });

    this.checkWorkingStatus();
    this.getWorkingStatistics();
  }

  ngOnInit(): void {
    this.route.params.map((params: Params) => params['id']).subscribe(
      id => {
        if (!id) {
          id = 43;
        }
        this.getTree(id);
      });
  }

  getTree(id: number): void {

    this.homeService.getNodeInformation(id).subscribe(
      data => this.parentTask = data,
      err => this.snackBar.open('Loading document failed', '', {
        duration: 2000
      })
    );

    this.homeService.getNodeChildren(id).subscribe(
      data => this.docObjects = data,
      err =>
        this.snackBar.open('Loading tree failed', '', {
          duration: 2000
        })
    );
  }

  createNewTaskHere() {
    this.router.navigate(['/taskeditor', this.parentTask.Id]);
  }

  onDocObjClick(document: OcpDocument) {
    if (document.DocumentTypeId === 1044 && document.NumberOfChildrenInTree === 0 &&
      (document.StateMachineData === null || (document.StateMachineData as any).CurrentStateTextId !== 'Finished')) {
      this.router.navigate(['/document', document.Id]);
    } else {
      this.router.navigate(['/home', document.Id]);
    }
  }

  onPrevClick() {
    this.router.navigate(['/home', this.parentTask.ParentDocumentIds[0]]);
  }

  onStartWorking(docObject: OcpDocument) {
    event.stopPropagation();

    this.showLoader = true;

    this.homeService.startWorking(docObject.Id).subscribe(
      data => this._sharedService.updateWorkingStatus(data),
      err => this.snackBar.open('Couldn"t start working ', '', {
          duration: 2000
        }
      ),
      () =>
        this
          .showLoader = false
    );
  }

  onStopWorking(docObject: OcpDocument) {
    event.stopPropagation();

    this.showLoader = true;

    this.homeService.stopWorking().subscribe(
      data => this._sharedService.updateWorkingStatus(null),
      err => this.snackBar.open('Couldn"t stop working ', '', {
          duration: 2000
        }
      ),
      () => {
        this
          .showLoader = false;
      }
    )
    ;
  }

  onStartFromSwitchOption(obj) {
    event.stopPropagation();
    let ocpDoc = new OcpDocument();
    ocpDoc.Id = obj.TaskId;
    this.onStartWorking(ocpDoc);
  }

  onClickOnSwitchOption(obj) {
    this.router.navigate(['/document', obj.TaskId]);
  }

  checkWorkingStatus() {

    this.homeService.getCurrentWorkStatus().subscribe(
      data => this._sharedService.updateWorkingStatus(data),
      err => this.snackBar.open('Loading current work status failed', '', {
        duration: 2000
      })
    );
  }

  getWorkingStatistics() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    this.homeService.getWorkStats(year, month).subscribe(
      data => this._sharedService.updateWorkStatistics({
        HoursWorkedThisMonth: data.HoursWorkedThisMonth.toFixed(2),
        HoursWorkedToday: data.HoursWorkedToday.toFixed(2),
        AverageHoursPerWorkingDayThisMonth: data.AverageHoursPerWorkingDayThisMonth.toFixed(2),
        HolidayHoursAvailableThisMonth: data.HolidayHoursAvailableThisMonth.toFixed(2)
      }),
      err => this.snackBar.open('Loading work stats failed', '', {
        duration: 2000
      })
    );
  }
}

