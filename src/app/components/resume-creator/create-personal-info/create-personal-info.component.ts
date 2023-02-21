import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../../../services/local-data.service';
import { Location } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import PersonalInfo from '../../../models/personalInfo';

@Component({
  selector: 'app-create-personal-info',
  templateUrl: './create-personal-info.component.html',
  styleUrls: ['./create-personal-info.component.css']
})
export class CreatePersonalInfoComponent {
 
  personalInfoForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  phoneRegx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  provinceCollection: string[] = [];
  cityCollection: string[] = [];
  
  submitted = false;
  personalInfo;

  saved = false;

  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      phoneNumber: ['', [Validators.pattern(this.phoneRegx)]],
      city: ['', Validators.required],
      province: ['', Validators.required]
    });
 
    this.getProvinces();
  }
  
  getProvinces() {
    this.provinceCollection = this.localDataService.getProvinces();
  }

  get f() {
    return this.personalInfoForm.controls;
  } l

  changeProvince(e) {
    this.cityCollection = [];
    this.personalInfoForm.controls['city'].setValue('');

    if (e.target.value == "") {
      return;
    }
    else {
      var cities = this.localDataService.getCities(e.target.value);
      this.cityCollection = cities;
    }
  }

  // save personal-info to local-data-service
  onSubmit() {
    this.submitted = true;

    if (!this.personalInfoForm.valid) {
      return;
    }

    // prepare personal info data
    var personalInfoData = {
      firstName: this.personalInfoForm.value["firstName"],
      lastName: this.personalInfoForm.value["lastName"],
      emailAddress: this.personalInfoForm.value["emailAddress"],
      phoneNumber: this.personalInfoForm.value["phoneNumber"],
      city: this.personalInfoForm.value["city"],
      province: this.personalInfoForm.value["province"]
    };

    // save to local-data-service
    this.personalInfo = new PersonalInfo(); 
    this.personalInfo = personalInfoData;
    this.localDataService.setPersonalInfo(this.personalInfo);

    this.saved = true;
    
    setTimeout(() => {
      this.reset();
    }, 3000);  
  }

  reset() {
    this.saved = false;
    this.personalInfoForm.reset();
    this.submitted = false;
  }

  // edit personal-info
  editPersonalInfo(personalInfo) {  

    // load personal-info in form
    if (personalInfo !== null && personalInfo !== undefined) {   

      this.cityCollection = this.localDataService.getCities(personalInfo.province);

      this.personalInfoForm.setValue({
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        emailAddress: personalInfo.emailAddress,
        phoneNumber: personalInfo.phoneNumber,
        province: personalInfo.province,
        city: personalInfo.city
      });
    }
    else
      return;
  }
}
