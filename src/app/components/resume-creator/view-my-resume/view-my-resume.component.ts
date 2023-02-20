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
    var dataValid = false;
    
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
    dataValid = true;
    
    if (dataValid)
      return myResume;
    else
      return null;
  }
  createAndDownloadResume() {
    
    this.error = '';

    var myResume = this.prepareDataForResumeService();
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
          }
        );
    }
    else {
      this.error = 'Resume Data Not Found!';
      /*
      setTimeout(() => {
        this.error = '';
      }, 3000);
      */
    }
  }

  createAndEmailResume() {    
  }

  previewResume() {   
    this.getResumeData();

    this.previewResumeFlag = true;
    /*
    if (this.localDataService.isErrorBeforePreview(this.personalInfo, this.skills, this.workExperience, this.education)) {
      this.previewResumeFlag = false;
      this.error = "Information is Incomplete!";
    }
    else {
      this.previewResumeFlag = true;
    }
    */
    
  }
}