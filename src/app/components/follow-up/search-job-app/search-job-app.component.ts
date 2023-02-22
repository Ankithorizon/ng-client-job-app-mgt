import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { DataService } from '../../../services/data.service';
import { LocalDataService } from '../../../services/local-data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-search-job-app',
  templateUrl: './search-job-app.component.html',
  styleUrls: ['./search-job-app.component.css']
})
export class SearchJobAppComponent implements OnInit {

  @Input() jobApps = [];
  @Output() dataFilterDone: EventEmitter<any[]> =   new EventEmitter();


  cities = [];
  provinces = [];
  sProvince = '';
  sCity = '';
  sContactPersonName = '';

  hoveredDate: NgbDate | null = null;

	fromDate: NgbDate | null;
	toDate: NgbDate | null;

  sFromDate = {};
  sToDate = {};
  
  
  constructor(public localDataService: LocalDataService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter)
  {
    // default assign date
		// this.fromDate = calendar.getToday();
		// this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
	}

  ngOnInit(): void {
    this.getProvinces();
  }
  
  getProvinces() {
    this.provinces = this.localDataService.getProvinces();
  }
  
  changeProvince(e) {
    console.log(e.target.value);
    this.cities = [];
    this.sCity = '';
    this.sProvince = e.target.value;

    if (e.target.value == "") {
      return;
    }
    else {
      var cities_ = this.localDataService.getCities(e.target.value);
      this.cities = cities_;
    }
  }
  changeCity(e) {
    console.log(e.target.value);
    this.sCity = e.target.value;
  }
  
	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}


  // filter job-apps
  filterNow() { 

    var filterProvince = this.sProvince;
    var filterCity = this.sCity;
    var filterContactPersonName = this.sContactPersonName;
    
    // province, city
    var jobApps_ = [...this.localDataService.getJobApps()];

    // contact-person-name
    var jobApps__ = [];

    // province
    if (filterProvince !== '') {
      jobApps_ = jobApps_.filter(function (job) {
        return job.province === filterProvince;
      });
    }
    
    // city
    if (filterCity !== '') {
      jobApps_ = jobApps_.filter(function (job) {
        return job.city === filterCity;
      });
    }
    
    // contact-person-name
    if (filterContactPersonName !== '') {
      jobApps__ = this.localDataService.getJobApps().filter(function (job) {
        return job.contactPersonName === filterContactPersonName;
      });
    }


    var result = [];
    if (filterProvince === '' && filterCity === '' && filterContactPersonName!=='') {
      result = [...jobApps__];
    }
    else if (filterProvince === '' && filterCity === '' && filterContactPersonName === '') {
      result = [...jobApps_];
    }
    else {
      // combine 2 arrays and remove duplicate
      // province, city, contact-person-name
      result = [...new Set([...jobApps_, ...jobApps__])];
    }

    // here result[] = [(province && city) || contact-person-name]

    // start-applied-on, end-applied-on
    if (this.fromDate !== undefined && this.toDate !== undefined && this.fromDate !== null && this.toDate
    !==null) {
      var filterAppliedOnStart = new Date(this.fromDate.year + '/' + this.fromDate.month + '/' + this.fromDate.day);
      var filterAppliedOnEnd = new Date(this.toDate.year + '/' + this.toDate.month + '/' + this.toDate.day);
      
      jobApps_ = result.filter(function (job) {
        return moment(job.appliedOn).format("YYYY-MM-DD") <= moment(filterAppliedOnEnd).format("YYYY-MM-DD")
          && moment(job.appliedOn).format("YYYY-MM-DD") >= moment(filterAppliedOnStart).format("YYYY-MM-DD");
      });
    }
    else {
      jobApps_ = [...result];
    }

    // here result[] = [(province && city) || contact-person-name] && [(from-date && end-date)]

    // this will reset date-range after filter
    this.dateRangeReset();

    // return jobApps_ to parent-component   
    this.dataFilterDone.emit(jobApps_);
  }

  dateRangeReset() {
    this.fromDate = undefined;
    this.toDate = undefined;
  }
}
