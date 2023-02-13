import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobAppComponent } from './add-job-app.component';

describe('AddJobAppComponent', () => {
  let component: AddJobAppComponent;
  let fixture: ComponentFixture<AddJobAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJobAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
