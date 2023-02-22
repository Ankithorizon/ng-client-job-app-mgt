import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { FollowUpComponent } from './components/follow-up/follow-up.component';
import { ViewJobAppComponent } from './components/follow-up/view-job-app/view-job-app.component';
import { EditJobAppComponent } from './components/follow-up/edit-job-app/edit-job-app.component';
import { AddJobAppComponent } from './components/follow-up/add-job-app/add-job-app.component';
import { JobResumeUploadComponent } from './components/job-resume-upload/job-resume-upload.component';
import { TrackJobAppComponent } from './components/follow-up/track-job-app/track-job-app.component';
import { ResumeCreatorComponent } from './components/resume-creator/resume-creator.component';
import { ViewUserDataComponent } from './components/view-user-data/view-user-data.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'follow-up', component: FollowUpComponent },
  { path: 'view-job', component: ViewJobAppComponent },
  { path: 'edit-job', component: EditJobAppComponent },
  { path: 'apply-job', component: AddJobAppComponent },
  { path: 'track-job', component: TrackJobAppComponent },
  { path: 'resume-upload', component: JobResumeUploadComponent },
  { path: 'resume-creator', component: ResumeCreatorComponent },
  { path: 'view-user-data', component: ViewUserDataComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }