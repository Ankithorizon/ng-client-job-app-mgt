import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../../../services/local-data.service';
import { Location } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import JobApplication from '../../../models/jobApplication';

@Component({
  selector: 'app-edit-job-app',
  templateUrl: './edit-job-app.component.html',
  styleUrls: ['./edit-job-app.component.css']
})
export class EditJobAppComponent implements OnInit {

  // validation
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  phoneRegx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;


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

  cities = [];
  provinces = [];
  
  // form
  jobAppEditForm: FormGroup;
  submitted = false;
  apiResponse = '';
  responseColor = '';
  errors: string[];

  // before edit appStatus
  beforeEditAppStatus=0;
  showEditAppStatusDatePicker = false;

  jobApplication = new JobApplication();  

  // appStatusChangedOn/appliedOn validation for null
  appStatusChangedOnValid = true;
  appliedOnValid = true;

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
      
      this.provinces = this.localDataService.getProvinces();
      this.cities = this.localDataService.getCities(this.selectedJob.province);

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
        contactEmail: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
        phoneNumber: ['', [Validators.pattern(this.phoneRegx)]],
        city: ['', [Validators.required]],
        province: ['', [Validators.required]],
        appliedOn: [''],
        appStatus: ['', [Validators.required]],
        followUpNotes: [''],
        appStatusChangedOn: ['']
      });

      var appliedOnDate = new Date(this.selectedJob.appliedOn.toString());            
      const appliedOnDateDisplay = new NgbDate(appliedOnDate.getFullYear(), appliedOnDate.getMonth()+1, appliedOnDate.getDate());
      
      var currentDate = new Date();
      const currentDateDisplay = new NgbDate(currentDate.getFullYear(), currentDate.getMonth()+1, currentDate.getDate());
      
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
        appliedOn: appliedOnDateDisplay,
        appStatus: this.selectedJob.appStatus,
        followUpNotes: this.selectedJob.followUpNotes,
        appStatusChangedOn: currentDateDisplay,
      });

      this.beforeEditAppStatus = this.selectedJob.appStatus;

      console.log(this.jobAppEditForm.value);
    }
  }

  onAppStatusChange(event) {
    if (event.target.value.toString() === this.beforeEditAppStatus.toString()) {
      this.showEditAppStatusDatePicker = false;
    }
    else {
      this.showEditAppStatusDatePicker = true;
    }
  }

  changeProvince(e) {
    // reset city, when province gets changed
    this.cities = [];
    this.jobAppEditForm.controls['city'].setValue('');

    if (e.value == "") {
      return;
    }
    else {
      var cities = this.localDataService.getCities(e.value);
      this.cities = cities;
    }
  }
  
  get f() {
    return this.jobAppEditForm.controls;
  }

  onSubmit(): void {
   
    this.appStatusChangedOnValid = true;
    this.appliedOnValid = true;
    this.submitted = true;
    
    // prepare object for api call
    this.jobApplication = this.jobAppEditForm.value;
    this.jobApplication.jobApplicationId = this.selectedJob.jobApplicationId;
  
    // complete form validation
    if (!this.jobAppEditForm.valid) {
      console.log('Invalid Form!');
      return;
    }
    

    var jobApplicationEditVM = {
      jobApplication:
      {
        appliedOn: null,
        appStatus: 0,
      },
      appStatusChanged: false,
      appStatusChangedOn: null
    };

    // appliedOn validation
    if (this.jobAppEditForm.value["appliedOn"] === null) {
      this.appliedOnValid = false;
      return;
    }
    else
      this.appliedOnValid = true;

    // appStatusChangedOn validation
    if (this.jobAppEditForm.value["appStatus"].toString() !== this.beforeEditAppStatus.toString()) {

      if (this.jobAppEditForm.value["appStatusChangedOn"] === null) {
        this.appStatusChangedOnValid = false;
        return;
      }
   
      this.appStatusChangedOnValid = true;
      
      jobApplicationEditVM = {
        jobApplication: {
          ...this.jobApplication,
          appStatus: Number(this.jobApplication.appStatus)
        },
        appStatusChanged: true,
        appStatusChangedOn: this.jobAppEditForm.value["appStatusChangedOn"]
      }
      var appStatusChangedOnDate = new Date(jobApplicationEditVM.appStatusChangedOn.year + '/' + jobApplicationEditVM.appStatusChangedOn.month + '/' + jobApplicationEditVM.appStatusChangedOn.day);
      jobApplicationEditVM = {
        ...jobApplicationEditVM,
        appStatusChangedOn: appStatusChangedOnDate
      }
    }
    else {    
      jobApplicationEditVM = {
        jobApplication: {
          ...this.jobApplication,
          appStatus: Number(this.jobApplication.appStatus)
        },
        appStatusChanged: false,
        appStatusChangedOn: new Date()
      }
    }   
    

    var appliedOnDate = new Date(jobApplicationEditVM.jobApplication.appliedOn.year + '/' + jobApplicationEditVM.jobApplication.appliedOn.month + '/' + jobApplicationEditVM.jobApplication.appliedOn.day);
    jobApplicationEditVM.jobApplication = {
      ...jobApplicationEditVM.jobApplication,
      appliedOn: appliedOnDate
    }   
    
    
    this.dataService.editJobApp(jobApplicationEditVM)
      .subscribe(
        response => {
          console.log(response);
          if (response.responseCode === 0) {
            // success    
            this.apiResponse = response.responseMessage;
            this.responseColor = 'green';

            this.reset();

            setTimeout(() => {
              this.router.navigate(['/follow-up']);
              this.apiResponse = '';
            }, 3000);
          }
        },
        error => {
          this.apiResponse = '';
          this.responseColor = 'red';
          this.errors = [];

          if (error.status === 400) {
            console.log(error);
          }
        }
      );
    }

  goBack(){
    this.router.navigate(['/follow-up']);
  }

  reset() {
    this.jobAppEditForm.reset();
    this.submitted = false;
    this.errors = [];

    // disable browser back button
    // history.pushState(null, '');
  }  
}
