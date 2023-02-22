import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResumeEmailDataComponent } from './user-resume-email-data.component';

describe('UserResumeEmailDataComponent', () => {
  let component: UserResumeEmailDataComponent;
  let fixture: ComponentFixture<UserResumeEmailDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserResumeEmailDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResumeEmailDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
