import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResumeDownloadDataComponent } from './user-resume-download-data.component';

describe('UserResumeDownloadDataComponent', () => {
  let component: UserResumeDownloadDataComponent;
  let fixture: ComponentFixture<UserResumeDownloadDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserResumeDownloadDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResumeDownloadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
