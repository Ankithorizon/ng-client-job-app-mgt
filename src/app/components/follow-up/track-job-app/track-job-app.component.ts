import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../../../services/local-data.service';
import { Location } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-track-job-app',
  templateUrl: './track-job-app.component.html',
  styleUrls: ['./track-job-app.component.css']
})
export class TrackJobAppComponent implements OnInit {

  myState;
  selectedJob = {
    jobApplicationId: 0,
    appStatus:0,
  };

  bar1 = 50;
  bar2 = 70;
  /*
    appStatus
    : 
    2
    appStatusChangedOn
    : 
    "2023-02-10T06:00:00"
    appStatusLogId
    : 
    1
    jobApplication
    : 
    null
    jobApplicationId
    : 
    1
  */
  appStatusTrackingData = [];

  constructor(private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public localDataService: LocalDataService,
    public dataService: DataService,
    private router: Router) {
  }


  ngOnInit(): void {
    this.myState = this.location.getState();

    if (this.myState.selectedJob == null || this.myState.selectedJob == undefined)
      this.router.navigate(['/follow-up']);
    else {
      this.selectedJob = this.myState.selectedJob.selectedJob;
      this.trackJobApp();
    }
  }

  trackJobApp() {
    this.dataService.trackJobApp(Number(this.selectedJob.jobApplicationId))
      .subscribe(
        data => {
          console.log(data);
          this.appStatusTrackingData = data;
        },
        error => {
          console.log(error);
        }
      );
  }
}
