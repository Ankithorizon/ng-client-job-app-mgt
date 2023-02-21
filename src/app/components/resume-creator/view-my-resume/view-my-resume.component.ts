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
import WorkExperience from '../../../models/workExperience';
import Education from '../../../models/education';
import PersonalInfo from '../../../models/personalInfo';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

@Component({
  selector: 'app-view-my-resume',
  templateUrl: './view-my-resume.component.html',
  styleUrls: ['./view-my-resume.component.css']
})
export class ViewMyResumeComponent implements OnInit {

  workExperience = [];
  education = [];
  personalInfo = new PersonalInfo();
  skills = [];

  previewResumeFlag = false;
  error = '';
  successApiMessage = '';

  
  constructor(private location: Location,
    private fb: FormBuilder,
    public dataService: DataService,
    public localDataService: LocalDataService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter) {
  }

  ngOnInit(): void {  
  }

  getResumeData() {
    this.personalInfo = this.localDataService.getPersonalInfo();
    this.skills = this.localDataService.getSkills();
    this.workExperience = this.localDataService.getWorkExperience();
    this.education = this.localDataService.getEducation();

    console.log(this.personalInfo, this.skills, this.workExperience, this.education);
  }


  prepareDataForResumeService() {

    if (this.localDataService.isObjectNullORUndefinedOREmpty(this.personalInfo, this.skills, this.workExperience, this.education)) {      
      return null;
    }
    
    // format work-experience's startDate/endDate    
    var woExps = this.workExperience;
    woExps.forEach((woe) => {
      var startDate_ = monthNames[new Date(woe.startDate).getMonth()] + ', ' + new Date(woe.startDate).getFullYear();
      woe.startDate = startDate_;

      if (woe.tillDate) {
        woe.endDate = 'Till - Date';
      }
      else {
        var endDate_ = monthNames[new Date(woe.endDate).getMonth()] + ', ' + new Date(woe.endDate).getFullYear();
        woe.endDate = endDate_;
      }
    });
    
    
    // format education's startDate/endDate
    var edus = this.education;
    edus.forEach((edu) => {
      var startDate_ = monthNames[new Date(edu.startDate).getMonth()] + ', ' + new Date(edu.startDate).getFullYear();
      edu.startDate = startDate_;

      var endDate_ = monthNames[new Date(edu.endDate).getMonth()] + ', ' + new Date(edu.endDate).getFullYear();
      edu.endDate = endDate_;
    });
    

    var myResume = {};
    myResume = {
      personalInfo: this.personalInfo,
      skills: this.skills,
      workExperience: woExps,
      education: edus
    };
    console.log(myResume);
    
    return myResume;
  }
  createAndDownloadResume() {
    
    this.error = '';
    this.successApiMessage = '';

    this.getResumeData();

    var myResume = this.prepareDataForResumeService();

    // check for 400, 500    
    /*
    var myResume = {};
    myResume = {
      personalInfo: this.personalInfo,
      skills: this.skills,
      // workExperience: this.workExperience,
      education: this.education
    };
    console.log(myResume);
    */
    
    if (myResume != null) {
      // api call      
      this.dataService.createAndDownloadResume(myResume)
        .subscribe(
          blob => {
            console.log(blob);

            // const myFile = new Blob([blob], { type: 'text/csv' });            
            const myFile = new Blob([blob], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(myFile);
            window.open(url);
            
            // redirect to resume-creator component, so 
            // all service variables get reset    
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          },
          error => {            
            console.log(error);
            if (error.status === 400)
              this.error = 'Bad Request !';
            else if (error.status === 500)
              this.error = 'Server Error !';
            else
              this.error = 'Error !';              
          }
        );
    }
    else {
      this.error = 'Resume Data Not Found!';    
    }
  } 

  previewResume() {   
    this.error = '';
    this.successApiMessage = '';
    
    this.getResumeData();

    if (this.localDataService.isObjectNullORUndefinedOREmpty(this.personalInfo, this.skills, this.workExperience, this.education)) {
      this.previewResumeFlag = false;
      this.error = "Information is Incomplete!";
    }
    else {
      this.previewResumeFlag = true;
    } 
  }

  createAndEmailResume() {
    this.error = '';
    this.successApiMessage = '';

    this.getResumeData();

    var myResume = this.prepareDataForResumeService();

    // check for 400, 500    
    /*
    var myResume = {};
    myResume = {
      personalInfo: this.personalInfo,
      skills: this.skills,
      // workExperience: this.workExperience,
      education: this.education
    };
    console.log(myResume);
    */
    
    if (myResume != null) {
      // api call
      this.dataService.createAndEmailResume(myResume)
        .subscribe(
          json => {
            console.log(json);
            this.successApiMessage = json;

            // redirect to resume-creator component, so 
            // all service variables get reset   
            setTimeout(() => {
              this.successApiMessage = '';
              window.location.reload();
            }, 3000);
          },
          error => {
            console.log(error);
            if (error.status === 400)
              this.error = 'Bad Request !';
            else if (error.status === 500)
              this.error = 'Server Error !';
            else
              this.error = 'Error !';
          }
        );
    }
    else {
      this.error = 'Resume Data Not Found!';
    }
  }
}