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

  // modal
  removeJobApp(content:any,selectedJob) {
    this.removeJobAppId = selectedJob.jobApplicationId;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        console.log(result);
        if (result === 'YES') {
          console.log('Remove job-app');
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

  viewJobApp(selectedJob) {
    this.router.navigate(['/view-job'], { state: { selectedJob: { selectedJob } } });
  }

  editJobApp(selectedJob) {
    this.router.navigate(['/edit-job'], { state: { selectedJob: { selectedJob } } });
  }
  
  // follow-up-notes
  openPanel(jobId) {
    this.displayPanelJobId = jobId;
  }
 
}
