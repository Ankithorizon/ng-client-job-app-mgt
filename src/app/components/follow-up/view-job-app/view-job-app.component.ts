import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../../../services/local-data.service';
import { Location } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-job-app',
  templateUrl: './view-job-app.component.html',
  styleUrls: ['./view-job-app.component.css']
})
export class ViewJobAppComponent implements OnInit {

  myState;
  selectedJob = {
    jobApplicationId: 0,
  };
  jobAppData;

  
   
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
      this.viewJobApp();
    }
  }
  
  viewJobApp() {
    this.dataService.viewJobApp(Number(this.selectedJob.jobApplicationId))
      .subscribe(
        data => {
          console.log(data);
          this.jobAppData = data;
        },
        error => {
          console.log(error);
        }
    );
  }
}