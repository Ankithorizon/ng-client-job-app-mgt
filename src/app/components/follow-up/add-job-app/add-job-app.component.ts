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
  selector: 'app-add-job-app',
  templateUrl: './add-job-app.component.html',
  styleUrls: ['./add-job-app.component.css']
})
export class AddJobAppComponent implements OnInit {

  // validation
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  phoneRegx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  cities = [];
  provinces = [];
  
  // form
  applyToJobForm: FormGroup;
  submitted = false;
  apiResponse = '';
  responseColor = '';
  errors: string[];

  jobApplication = new JobApplication();  

  // appliedOn validation for null
  // appliedOnValid = true;

  constructor(private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public localDataService: LocalDataService,
    public dataService: DataService,
    private router: Router) {
  }


  ngOnInit(): void {
   this.applyToJobForm = this.fb.group({
      companyName: [''],
      agencyName: [''],
      webURL: [''],
      contactPersonName: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      phoneNumber: ['', [Validators.pattern(this.phoneRegx)]],
      city: ['', Validators.required],
      province: ['', Validators.required],
      appliedOn: ['', Validators.required],
    });

    this.getProvinces();
  }

  get f() {
    return this.applyToJobForm.controls;
  }
  hasError = (controlName: string) => {
    if (this.applyToJobForm.controls[controlName].value === null || this.applyToJobForm.controls[controlName].value === '') {
      return true;
    }
    else
      return false;
  }

  goBack() {
    this.router.navigate(['/follow-up']);
  }

  reset() {
    this.applyToJobForm.reset();
    this.submitted = false;
    this.errors = [];
    this.apiResponse = '';
    this.responseColor = '';

    // disable browser back button
    history.pushState(null, '');  
  }

  getProvinces() {
    this.provinces = this.localDataService.getProvinces();
  }

  changeProvince(e) {
    console.log(e.target.value);
    this.cities = [];
    this.applyToJobForm.controls['city'].setValue('');

    if (e.target.value == "") {
      return;
    }
    else {
      var cities_ = this.localDataService.getCities(e.target.value);
      this.cities = cities_;
    }
  }

  onSubmit(): void {     

    this.errors = [];
    this.apiResponse = '';
    this.responseColor = '';
    this.submitted = true;
    
    // prepare object for api call
    this.jobApplication = this.applyToJobForm.value;
  
    // complete form validation
    if (!this.applyToJobForm.valid) {
      console.log('Invalid Form!');
      return;
    }
    else {
      
      var applyJobApplication = {
        appliedOn: null,
      };
      applyJobApplication = { ... this.jobApplication };
         
      applyJobApplication = {
        ...applyJobApplication,
        appliedOn: new Date(applyJobApplication.appliedOn.year + '/' + applyJobApplication.appliedOn.month + '/' + applyJobApplication.appliedOn.day)
      };

      console.log(applyJobApplication);

        this.dataService.addJobApp(applyJobApplication)
      .subscribe(
        response => {
          if (response.responseCode === 0) {
            // success    
            this.apiResponse = response.responseMessage;
            this.responseColor = 'green';

            setTimeout(() => {
              this.reset();
              this.router.navigate(['/follow-up']);              
            }, 3000);
          }       
        },
        error => {
          this.apiResponse = '';
          this.responseColor = 'red';
          this.errors = [];

          console.log(error);

          if (error.status === 400) {
            if (error.error.responseCode < 0) {
              this.apiResponse = error.error.responseMessage;
            }
            else {
              this.errors = this.localDataService.display400andEx(error, "Edit-Job-Application");
            }
          }
          if (error.status === 500) {
            this.apiResponse = error.error;
          }
        }
      );
    }
  }
}
