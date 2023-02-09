import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobAppComponent } from './view-job-app.component';

describe('ViewJobAppComponent', () => {
  let component: ViewJobAppComponent;
  let fixture: ComponentFixture<ViewJobAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewJobAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJobAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
