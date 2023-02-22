import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ToastrModule } from 'ngx-toastr';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FollowUpComponent } from './components/follow-up/follow-up.component';
import { ViewJobAppComponent } from './components/follow-up/view-job-app/view-job-app.component';
import { EditJobAppComponent } from './components/follow-up/edit-job-app/edit-job-app.component';
import { AddJobAppComponent } from './components/follow-up/add-job-app/add-job-app.component';
import { SearchJobAppComponent } from './components/follow-up/search-job-app/search-job-app.component';
import { JobResumeUploadComponent } from './components/job-resume-upload/job-resume-upload.component';
import { TrackJobAppComponent } from './components/follow-up/track-job-app/track-job-app.component';
import { ResumeCreatorComponent } from './components/resume-creator/resume-creator.component';
import { CreatePersonalInfoComponent } from './components/resume-creator/create-personal-info/create-personal-info.component';
import { CreateSkillsComponent } from './components/resume-creator/create-skills/create-skills.component';
import { CreateExperienceComponent } from './components/resume-creator/create-experience/create-experience.component';
import { CreateEducationComponent } from './components/resume-creator/create-education/create-education.component';
import { ViewMyResumeComponent } from './components/resume-creator/view-my-resume/view-my-resume.component';
import { ViewUserDataComponent } from './components/view-user-data/view-user-data.component';
import { UserResumeDownloadDataComponent } from './components/view-user-data/user-resume-download-data/user-resume-download-data.component';
import { UserResumeEmailDataComponent } from './components/view-user-data/user-resume-email-data/user-resume-email-data.component';


// services
import { DataService } from './services/data.service';
import { ToastService } from './services/toast.service';
import { LocalDataService } from './services/local-data.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FollowUpComponent,
    ViewJobAppComponent,
    EditJobAppComponent,
    AddJobAppComponent,
    SearchJobAppComponent,
    JobResumeUploadComponent,
    TrackJobAppComponent,
    ResumeCreatorComponent,
    CreatePersonalInfoComponent,
    CreateSkillsComponent,
    CreateExperienceComponent,
    CreateEducationComponent,
    ViewMyResumeComponent,
    ViewUserDataComponent,
    UserResumeDownloadDataComponent,
    UserResumeEmailDataComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,    
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot({
      timeOut: 5000, // 5 seconds
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [LocalDataService, DataService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
