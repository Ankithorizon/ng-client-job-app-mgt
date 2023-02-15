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
    appStatus: 0,
    companyName: '',
    agencyName: '',
    webURL: '',
    contactPersonName: '',
    contactEmail: '',
    phoneNumber: '',
    city: '',
    province: '',
    appliedOn: null,
    followUpNotes: ''
  };

  appStatusTypes: Array<any>;

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

      this.appStatusTypes = this.localDataService.getAppStatusTypes();
      console.log(this.appStatusTypes);
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
  
  goBack() {
    this.router.navigate(['/follow-up']);
  }
}
