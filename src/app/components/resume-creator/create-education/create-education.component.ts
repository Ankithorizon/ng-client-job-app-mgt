import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { DataService } from '../../../services/data.service';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../../../services/local-data.service';
import { Location } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import Education from '../../../models/education';
import Validation from '../../../services/Validation';

@Component({
  selector: 'app-create-education',
  templateUrl: './create-education.component.html',
  styleUrls: ['./create-education.component.css']
})
export class CreateEducationComponent implements OnInit {

   
  saved = false;

  countries = [];
  educations = [];

  // form
  eduForm: FormGroup;
  submitted = false;

  education = new Education();

  constructor(private location: Location,
    private fb: FormBuilder,
    public dataService: DataService,
    public localDataService: LocalDataService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter) {
  }

  ngOnInit(): void {
    this.eduForm = this.fb.group({
      country: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      degreeName: ['', Validators.required],
      universityName: ['', Validators.required],
      major: ['', Validators.required],
    },
      {
        validators: [Validation.match('startDate', 'endDate')]
      });
    
    this.getCountries();
  }
  
  getCountries() {
    this.countries = this.localDataService.getCountries();
  }

  get f() {
    return this.eduForm.controls;
  }
  hasError = (controlName: string) => {
    if (controlName === 'startDate' || controlName === 'endDate') {
      return !this.processDate(this.eduForm.controls[controlName].value);
    }

    if (this.eduForm.controls[controlName].value === null || this.eduForm.controls[controlName].value === '') {
      return true;
    }
    else
      return false;
  }

  
  processDate(date_) {
    if (date_ === '')
      return false; // 'empty date';
    else if (date_ === null || date_ === undefined)
      return false; // 'null date';
    else {
      var date__ = new Date(date_.year + "/" + date_.month + "/" + date_.day);
      if (Object.prototype.toString.call(date__) === "[object Date]") {
        // it is a date
        if (isNaN(date__.getTime())) {
          return false; // 'invalid date,,,';
        } else {
          return true; // date__;
        }
      } else {
        // not a date object
        return false;  // 'invalid date,,,';
      }
    }
  }

  isDuplicateDegree(degreeName) {
    return this.localDataService.getEducation().findIndex(x => x.degreeName === degreeName) !== -1;
  }

  onSubmit(): void {
    
    this.submitted = true;


    if (!this.eduForm.valid) {
      console.log('Invalid Form!');
      return;
    }
    else {
      console.log(this.eduForm.value);

      var edu = {
        degreeName: this.eduForm.controls['degreeName'].value,
        universityName: this.eduForm.controls['universityName'].value,
        major: this.eduForm.controls['major'].value,
        country: this.eduForm.controls['country'].value,
        startDate: new Date(this.eduForm.controls['startDate'].value.year + "/" + this.eduForm.controls['startDate'].value.month + "/" + this.eduForm.controls['startDate'].value.day),
        endDate: new Date(this.eduForm.controls['endDate'].value.year + "/" + this.eduForm.controls['endDate'].value.month + "/" + this.eduForm.controls['endDate'].value.day),
      };


      // save to local-data-service
      var edus = [];
      edus = this.localDataService.getEducation() || [];
      if (edus.length < 1)
        edus.push(edu);
      else {
        // check for duplicate degree name
        if (this.isDuplicateDegree(edu.degreeName)) {
          // replace degree-name
          var foundIndex = edus.findIndex(x => x.degreeName === edu.degreeName);
          edus[foundIndex] = edu;
        }
        else {
          // add as new degree
          edus = [...edus, edu];
        }
      }
      
      this.educations = [...edus];
      this.localDataService.setEducation(edus);
      console.log(this.localDataService.getEducation());

      this.saved = true;
    
      setTimeout(() => {
        this.reset();
      }, 1500);
    }
  }

  reset() {
    this.eduForm.reset();
    this.submitted = false;
    this.saved = false;
  }


  // edit edu
  editEdu(edu) {
    var eduEdit = this.localDataService.getEducation().filter(function (obj) {
      return obj.degreeName === edu.degreeName;
    });

    // load selected edu object in form
    if (eduEdit !== null && eduEdit.length === 1) {

      this.eduForm.setValue({
        degreeName: eduEdit[0].degreeName,
        universityName: eduEdit[0].universityName,
        major: eduEdit[0].major,
        country: eduEdit[0].country,
        startDate: {
          year: eduEdit[0].startDate.getFullYear(),
          month: eduEdit[0].startDate.getMonth() + 1,
          day: eduEdit[0].startDate.getDate()
        },
        endDate: {
          year: eduEdit[0].endDate.getFullYear(),
          month: eduEdit[0].endDate.getMonth() + 1,
          day: eduEdit[0].endDate.getDate()
        }
      });
    }
    else
      return;
  }

  // remove edu
  removeEdu(edu) {
    this.educations = this.localDataService.getEducation().filter(function (obj) {
      return obj.degreeName !== edu.degreeName;
    });
    this.localDataService.setEducation(this.educations);
  }

}