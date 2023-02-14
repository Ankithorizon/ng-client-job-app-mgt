import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../../services/local-data.service';
import { Location } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import JobApplication from '../../models/jobApplication';

@Component({
  selector: 'app-job-resume-upload',
  templateUrl: './job-resume-upload.component.html',
  styleUrls: ['./job-resume-upload.component.css']
})
export class JobResumeUploadComponent implements OnInit {

  
  myState;
  selectedJob = {
    jobApplicationId: 0,
    companyName: '',
    agencyName: '',
    webURL: '',
    contactPersonName: '',
    contactEmail: '',
    phoneNumber: '',
    city: '',
    province: '',
    appliedOn: Date,
    appStatus: 0,
    followUpNotes: ''
  };
  
  appStatusTypes = [];
  applicationStatusCollection = [];

   constructor(private location: Location,
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
      
      console.log(this.selectedJob);
    
      this.applicationStatusCollection = this.localDataService.getAppStatusTypes();
      this.applicationStatusCollection.forEach(element => {
        this.appStatusTypes.push({
          value: this.applicationStatusCollection.indexOf(element),
          text: element
        });
      });
      console.log(this.appStatusTypes);

      
    }
  }

  goBack(){
    this.router.navigate(['/follow-up']);
  }
}
