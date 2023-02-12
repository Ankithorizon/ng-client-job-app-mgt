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
        },
        error => {
          console.log(error);
        });
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
 
}
