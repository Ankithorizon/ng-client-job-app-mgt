import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyResumeComponent } from './view-my-resume.component';

describe('ViewMyResumeComponent', () => {
  let component: ViewMyResumeComponent;
  let fixture: ComponentFixture<ViewMyResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
