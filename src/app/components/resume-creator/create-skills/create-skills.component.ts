import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataService } from '../../../services/local-data.service';
import { Location } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-skills',
  templateUrl: './create-skills.component.html',
  styleUrls: ['./create-skills.component.css']
})
export class CreateSkillsComponent {

  skills = [];
  addingSkill;

  saved = false;

  constructor(
    private router: Router,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService
  ) {
  }

  // remove skill from skills[]
  removeSkill(skill) {
    console.log(skill);
    this.skills = this.skills.filter(function( obj ) {
      return obj !== skill;
    });
    
  }

  // add skill to skills[]
  addSkill() {
    if (this.addingSkill !== '') {
      if(this.skills.findIndex(x => x ===this.addingSkill)===-1)      
        this.skills = [...this.skills, this.addingSkill];
    }
    
    this.addingSkill = '';
  }

  // save skills[] to local-data-service
  onSubmit() {

    // save to local-data-service
    this.localDataService.setSkills(this.skills);
    console.log(this.localDataService.getSkills());


    this.skills = this.localDataService.getSkills();


    this.saved = true;
    
    setTimeout(() => {
      this.reset();
    }, 3000);
  }

  reset() {
    this.saved = false;
  }
}
