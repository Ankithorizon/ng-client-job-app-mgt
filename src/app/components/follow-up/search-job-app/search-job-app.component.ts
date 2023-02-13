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

  hoveredDate: NgbDate | null = null;

	fromDate: NgbDate | null;
	toDate: NgbDate | null;

  sFromDate = {};
  sToDate = {};
  
  
  constructor(public localDataService: LocalDataService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter)
  {
		this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
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

    if (e.target.value == "") {
      return;
    }
    else {
      var cities_ = this.localDataService.getCities(e.target.value);
      this.cities = cities_;
    }
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
    var filterAppliedOnStart = new Date();
    var filterAppliedOnEnd = new Date();

    var filterProvince = 'MB';
    var filterCity = 'Winnipeg';
    var filterContactPersonName = '';
    
    // var jobApps_ = this.jobApps;
    var jobApps_ = [...this.jobApps];

    if (filterProvince !== '') {
      jobApps_ = jobApps_.filter(function (job) {
        return job.province === filterProvince;
      });
    }
    if (filterCity !== '') {
      jobApps_ = jobApps_.filter(function (job) {
        return job.city === filterCity;
      });
    }
    if (filterContactPersonName !== '') {
      jobApps_ = jobApps_.filter(function (job) {
        return job.contactPersonName === filterContactPersonName;
      });
    }
    if (filterAppliedOnStart !== null && filterAppliedOnEnd !== null) {
      jobApps_ = jobApps_.filter(function (job) {
        return moment(job.appliedOn).format("YYYY-MM-DD") <= moment(filterAppliedOnEnd).format("YYYY-MM-DD")
          && moment(job.appliedOn).format("YYYY-MM-DD") >= moment(filterAppliedOnStart).format("YYYY-MM-DD");
      });
    }
    // return jobApps_ to parent-component
    console.log('after filter in child comp,,, ', jobApps_);
    
    this.dataFilterDone.emit(jobApps_);
  }
}
