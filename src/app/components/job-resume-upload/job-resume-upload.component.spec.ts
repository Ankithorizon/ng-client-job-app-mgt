import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobResumeUploadComponent } from './job-resume-upload.component';

describe('JobResumeUploadComponent', () => {
  let component: JobResumeUploadComponent;
  let fixture: ComponentFixture<JobResumeUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobResumeUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobResumeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
