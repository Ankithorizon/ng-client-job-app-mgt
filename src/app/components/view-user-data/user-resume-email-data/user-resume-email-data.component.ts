import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../../../services/local-data.service';

@Component({
  selector: 'app-user-resume-email-data',
  templateUrl: './user-resume-email-data.component.html',
  styleUrls: ['./user-resume-email-data.component.css']
})
export class UserResumeEmailDataComponent implements OnInit {

  term: string;
  
  userData: Array<any>;
  
  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  tableSizes: any = [20, 30, 50];

  constructor(
    public localDataService: LocalDataService,
    private fb: FormBuilder,
    public dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUserResumeEmailData();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getUserResumeEmailData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getUserResumeEmailData();
  }

  getUserResumeEmailData() {
    this.dataService.getUserResumeEmailData()
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
