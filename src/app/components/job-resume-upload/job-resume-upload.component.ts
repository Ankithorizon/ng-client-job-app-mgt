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
import ResumeUpload from 'src/app/models/resumeUpload';

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
    appliedOn: null,
    appStatus: 0,
    followUpNotes: ''
  };
  
  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfos?: Observable<any>;

  resumeUpload = new ResumeUpload();
  
  // set dynamically class to dom tree
  apiResponse = '';

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
    }
  }

  goBack(){
    this.router.navigate(['/follow-up']);
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

  uploadResume(): void {
    this.progress = 0;
    this.message = "";
    this.apiResponse = '';

    if (this.currentFile) {

      this.resumeUpload.jobApplicationId = this.selectedJob.jobApplicationId;
      this.resumeUpload.resumeFile = this.currentFile;
      
      this.dataService.uploadResume(this.resumeUpload).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {

            // file-upload success
            if (event.body.responseCode === 0) {
              this.message = event.body.responseMessage;
              this.apiResponse = "success"; // this is the name of class @.css file
           
              // redirect to follow-up component 
              setTimeout(() => {
                // disable browser back button
                history.pushState(null, '');  
                this.router.navigate(['/follow-up']);
              }, 3000);
            }
            else {
              this.message = "Error !";
              this.apiResponse = "fail"; // this is the name of class @.css file
            }

            // reset fileName
            this.fileName = 'Select File';
          }
        },
        (err: any) => {
          this.apiResponse = "fail"; // this is the name of class @.css file
          this.progress = 0;

          if (err.error != null) {
            if (err.error.responseCode < 0) {
              this.message = err.error.responseMessage;
            }
            else {
              this.message = err.error;
            }
          }
          else {
            this.message = 'Could not upload the file !';
          }

          this.currentFile = undefined;

          // reset fileName
          this.fileName = 'Select File';
        });
    }
  }
}
