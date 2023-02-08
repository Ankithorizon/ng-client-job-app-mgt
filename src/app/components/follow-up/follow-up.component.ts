import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../../services/local-data.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {

  jobApps: Array<any>;
  appStatusTypes: Array<any>;

  constructor(
    private toastService: ToastService,
    private modalService: NgbModal,
    public localDataService: LocalDataService,
    public dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAppStatusTypes();
    this.getAllJobApps();  
  }

  getAppStatusTypes() {
    this.dataService.getAppStatusTypes()
      .subscribe(
        data => {
          console.log(data);
          this.appStatusTypes = data;

        },
        error => {
          console.log(error);
        }
    );
  }
  getAllJobApps() {
    this.dataService.getAllJobApps()
      .subscribe(
        data => {          
          console.log(data);
          this.jobApps = data;
        },
        error => {
          console.log(error);      
    });
  }

  viewJobApp() {
    console.log('view job app!');
  }
}
