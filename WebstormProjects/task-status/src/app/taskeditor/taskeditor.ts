import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { SharedService } from '../app.service'
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Task } from '../models/task.model';
import { PriorityEnum } from '../models/task.model';
import { TaskType } from '../models/task.model';
import { TaskEditorService } from './taskeditor.service';

import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'taskeditor',
    templateUrl: './taskeditor.html',
    styleUrls: ['./taskeditor.css']
})

export class TaskEditorView implements OnInit {

    taskDetails: Task;
    currentTask: any = {};
    priorities = PriorityEnum;
    priorityKeys;
    types = TaskType;
    typeKeys;

    constructor(public route: ActivatedRoute,
        public snackBar: MdSnackBar,
        private http: Http,
        private location: Location,
        private taskEditorService: TaskEditorService,
        private _sharedService: SharedService) {

        this.taskDetails = new Task();
        this.taskDetails.fieldValues = {
            Details: '',
            Description: '',
            Startdate: new Date(),
            Enddate: new Date(),
            Prioritate: '',
            Tip: '',
            Responsabil: parseInt(localStorage.getItem('userId')),
            Createdby: parseInt(localStorage.getItem('userId')),
            Zileestimate: 2,
            Releaseversion: '1.1.1'
        };

        this.priorityKeys = Object.keys(this.priorities).filter(k => !isNaN(Number(k)));
        this.typeKeys = Object.keys(this.types).filter(k => !isNaN(Number(k)));

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
            .map((params: Params) => params['parentId'])
            .subscribe(parentId => this.createNewTask(parentId));
    }

    createNewTask(parentId) {
        this.taskDetails.documentTypeId = 1044;
        this.taskDetails.parentDocumentIds = [parentId];
    }

    saveTask() {
        let body = {
            FieldValues: this.taskDetails.fieldValues,
            ParentDocumentIds: this.taskDetails.parentDocumentIds,
            DocumentTypeId: this.taskDetails.documentTypeId,
        }

        body.FieldValues.Tip = TaskType[this.taskDetails.fieldValues.Tip];
        body.FieldValues.Prioritate = PriorityEnum[this.taskDetails.fieldValues.Prioritate];

        this.taskEditorService.saveTask(body).subscribe(
            data => {
                this.snackBar.open("Task created", "", {
                    duration: 2000
                });
            }
        );

    }


    onPrevClick() {
        this.location.back();
    }
}
