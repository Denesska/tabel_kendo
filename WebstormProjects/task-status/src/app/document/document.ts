import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Http, Headers} from '@angular/http';
import {SharedService} from '../app.service';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../environments/environment';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {DocumentViewService} from './document.service';

import {MdSnackBar} from '@angular/material';

class Details {
  title: string;
  description: string;
  priority: string;
  assignedTo: string;
  type: string;
  id: number;
}

@Component({
  selector: 'document',
  templateUrl: './document.html',
  styleUrls: ['./document.css']
})

export class DocumentView implements OnInit {

  documentDetails: Details;
  currentTask: any = {};


  constructor(public route: ActivatedRoute,
              public snackBar: MdSnackBar,
              private http: Http,
              private location: Location,
              private documentViewService: DocumentViewService,
              private _sharedService: SharedService) {

    this.documentDetails = new Details();

    this._sharedService.workingStatusEmitted$.subscribe(task => {
      if (task !== null) {
        this.currentTask.TaskTitle = task.TaskTitle;
        this.currentTask.StartDate = new Date(task.StartDate);
      } else {
        this.currentTask.TaskTitle = 'Not working';
      }
    });
  }

  ngOnInit(): void {
    this.route.params
      .map((params: Params) => params['id'])
      .subscribe(id => this.getDocument(id));
  }

  getDocument(id) {
    const documentId = parseInt(id, 10);
    this.documentViewService.getDocumentFields(documentId)
      .subscribe(
        data => {
          this.documentDetails.id = data.Id;
          this.documentDetails.assignedTo = data.FieldValues.Responsabil;
          this.documentDetails.type = data.FieldValues.Tip;
          this.documentDetails.title = data.FieldValues.Description;
          this.documentDetails.priority = data.FieldValues.Prioritate;
          this.documentDetails.description = data.FieldValues.Details.substring(data.FieldValues.Details.indexOf('<body>'),
            data.FieldValues.Details.length - 7);
        },
        err => {
        }
      );
  }

  createSwitchOption() {
    const instance = this;
    instance.documentViewService.createSwitchOption(this.documentDetails.title, this.documentDetails.id)
      .subscribe(
        data => {
          this.snackBar.open('Switch option created', '', {
            duration: 2000
          });
        },
        err => {
        }
      );
  }

  onPrevClick() {
    this.location.back();
  }

  onStartWorking() {
    this.documentViewService.startWorking(this.documentDetails.id)
      .subscribe(
        data => {
          this._sharedService.updateWorkingStatus(data);
        },
        err => console.log(err),
        () => console.log('Attempted to start working')
      );
  }

  onStopWorking() {
    this.documentViewService.stopWorking()
      .subscribe(
        data => {
          this._sharedService.updateWorkingStatus(null);
        },
        err => console.log(err),
        () => console.log('Attempted to stop working')
      );
  }
}
