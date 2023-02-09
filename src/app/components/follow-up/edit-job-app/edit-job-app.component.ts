import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../../../services/local-data.service';
import { Location } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-job-app',
  templateUrl: './edit-job-app.component.html',
  styleUrls: ['./edit-job-app.component.css']
})
export class EditJobAppComponent implements OnInit {

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
    appliedOn: null,
    appStatus: 0,
    followUpNotes: ''
  };
  
  appStatusTypes = [];
  applicationStatusCollection = [];

  // form
  jobAppEditForm: FormGroup;
  submitted = false;
  apiMessage = '';
  apiError = false;
  modelErrors = [];

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
      
      this.applicationStatusCollection = this.localDataService.getAppStatusTypes();
      this.applicationStatusCollection.forEach(element => {
        this.appStatusTypes.push({
          value: this.applicationStatusCollection.indexOf(element),
          text: element
        });
      });
      console.log(this.appStatusTypes);

      // form
      this.jobAppEditForm = this.fb.group({
        companyName: [''],
        agencyName: [''],
        webURL: [''],
        contactPersonName: ['', [Validators.required]],
        contactEmail: ['', [Validators.required]],
        phoneNumber: ['', [Validators.pattern("^[0-9]*$")]],
        city: ['', [Validators.required]],
        province: ['', [Validators.required]],
        appliedOn: ['', [Validators.required]],
        appStatus: ['', [Validators.required]],
        followUpNotes: [''],
      });
      // patch form values
      this.jobAppEditForm.setValue({
        companyName: this.selectedJob.companyName,
        agencyName: this.selectedJob.agencyName,
        webURL: this.selectedJob.webURL,
        contactPersonName: this.selectedJob.contactPersonName,
        contactEmail: this.selectedJob.contactEmail,
        phoneNumber: this.selectedJob.phoneNumber,
        city: this.selectedJob.city,
        province: this.selectedJob.province,
        appliedOn: this.selectedJob.appliedOn,
        appStatus: this.selectedJob.appStatus,
        followUpNotes: this.selectedJob.followUpNotes,
      });

      console.log(this.jobAppEditForm.value);
    }
  }

  get f() {
    return this.jobAppEditForm.controls;
  }

  onSubmit(): void { 
    console.log(this.jobAppEditForm.value["appStatus"]);
    

  }

}
