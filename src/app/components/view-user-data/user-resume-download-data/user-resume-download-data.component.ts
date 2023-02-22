import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../../../services/local-data.service';

@Component({
  selector: 'app-user-resume-download-data',
  templateUrl: './user-resume-download-data.component.html',
  styleUrls: ['./user-resume-download-data.component.css']
})
export class UserResumeDownloadDataComponent implements OnInit {

    term: string;
  
  userData: Array<any>;
  
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 6, 9, 12];

  constructor(
    public localDataService: LocalDataService,
    private fb: FormBuilder,
    public dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUserResumeDownloadData();  
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getUserResumeDownloadData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getUserResumeDownloadData();
  }

  getUserResumeDownloadData() {
    this.dataService.getUserResumeDownloadData()
      .subscribe(
        data => {
          console.log(data);
          this.userData = data;
        },
        error => {
          console.log(error);
        });
  }
}
