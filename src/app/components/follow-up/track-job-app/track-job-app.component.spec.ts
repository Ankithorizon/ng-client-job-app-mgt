import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackJobAppComponent } from './track-job-app.component';

describe('TrackJobAppComponent', () => {
  let component: TrackJobAppComponent;
  let fixture: ComponentFixture<TrackJobAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackJobAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackJobAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
