import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../../services/local-data.service';

// toast
import { ToastService } from '../../services/toast.service';

// modal
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {

  // modal
  closeResult: string = '';
  removeJobAppId = 0;

  jobApps: Array<any>;
  appStatusTypes: Array<any>;

  // follow-up-notes-panel
  displayPanelJobId;

  // resume-download
  selectedJob: any;
  // check if file exists or not
  downloadStatus: string;
  downloadClass: string;

  constructor(
    private modalService: NgbModal,
    private toastService: ToastService,
    public localDataService: LocalDataService,
    public dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAppStatusTypes();
    this.getAllJobApps();
  }

  getAppStatusTypes() {
    this.dataService.getAppStatusTypes()
      .subscribe(
        data => {
          console.log(data);
          this.appStatusTypes = data;
          this.localDataService.setAppStatusTypes(this.appStatusTypes);
        },
        error => {
          console.log(error);
        }
      );
  }
  getAllJobApps() {
    this.dataService.getAllJobApps()
      .subscribe(
        data => {
          console.log(data);
          this.jobApps = data;
          this.localDataService.setJobApps(data);
        },
        error => {
          console.log(error);
        });
  }

  // track job-app
  trackJobApp(selectedJob) {
    this.router.navigate(['/track-job'], { state: { selectedJob: { selectedJob } } });
  }

  // view job-app
  viewJobApp(selectedJob) {
    this.router.navigate(['/view-job'], { state: { selectedJob: { selectedJob } } });
  }

  // edit job-app
  editJobApp(selectedJob) {
    this.router.navigate(['/edit-job'], { state: { selectedJob: { selectedJob } } });
  }
  
  // follow-up-notes
  openPanel(jobId) {
    this.displayPanelJobId = jobId;
  }

  // delete job-app
  // modal
  removeJobApp(content:any,selectedJob) {
    this.removeJobAppId = selectedJob.jobApplicationId;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        console.log(result);
        if (result === 'YES') {
          this.deleteJobApp(selectedJob);
        }
        else if (result === 'NO') {
          console.log('Return back to job-apps');
        }
        // this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }  
  /*
  private getDismissReason(reason: any): string {
    console.log(reason);
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  */
  deleteJobApp(jobAppToDelete) {      
    this.dataService.deleteJobApp(jobAppToDelete)
      .subscribe(
        response => {
          this.toastService.showSuccess('', response.responseMessage);   

          // delete job-app from jobApps[]
          this.jobApps = this.jobApps.filter(function( obj ) {
            return obj.jobApplicationId !== jobAppToDelete.jobApplicationId;
          });
          this.localDataService.setJobApps(this.jobApps);
        },
        error => {     
          if (error.status === 500) {
            this.toastService.showError('', error.error);    
          }
          if (error.status === 400) {
            if (error.error.responseCode < 0) {
              this.toastService.showError('', error.error.responseMessage);    
            }
            else {
              this.toastService.showError('', 'Error : Bad Request!');    
            }              
          }
        }
      );
  }

  // search-job-app child component returns filtered jobApps[]
  // filter job-apps
  dataFilterDoneHandler(jobApps_: any[]) {
    console.log('received filter data @parent,,,', jobApps_);
    this.jobApps = jobApps_;
  }
 
  // resume-upload
  resumeUpload(selectedJob) {
    this.router.navigate(['/resume-upload'], { state: { selectedJob: { selectedJob } } });
  }

  // resume-download
  resumeDownload(job) {
    this.selectedJob = job;
    console.log(job);
    this.dataService.downloadResume(job.jobApplicationId)
      .subscribe(blob => {

        // file exists and downloading
        this.setFileDownload('Downloading!', 'green');

        console.log(blob);
        // .txt
        if (blob.type === 'text/plain') {
          const myFile = new Blob([blob], { type: 'text/plain' });
          const url = window.URL.createObjectURL(myFile);
          window.open(url);
        }
        else if (blob.type === 'text/csv') {
          const myFile = new Blob([blob], { type: 'text/csv' });
          const url = window.URL.createObjectURL(myFile);
          window.open(url);
        }
        // .pdf
        else {
          // const myFile = new Blob([blob], { type: 'text/csv' });
          const myFile = new Blob([blob], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(myFile);
          window.open(url);
        }      

        setTimeout(() => {
          this.resetAfterFileDownload();
        }, 3000);

      }, error => {
        if (error.status === 400) {
          console.log('Resume Not Found on Server!');
          this.setFileDownload('Resume Not Found on Server!', 'red');
        }
        else if (error.status === 500) {
          console.log('Server Error!');
          this.setFileDownload('Server Error!', 'red');
        }
        else {       
          console.log("Error while downloading Resume!");
          this.setFileDownload('Error while downloading Resume!', 'red');
        }

        setTimeout(() => {
          this.resetAfterFileDownload();
        }, 3000);
      }
    );
  }
  resetAfterFileDownload() {
    this.downloadStatus = '';
    this.downloadClass = '';
  }
  setFileDownload(downloadStatus, downloadClass) {
    this.downloadStatus = downloadStatus;
    this.downloadClass = downloadClass;
  }
}
