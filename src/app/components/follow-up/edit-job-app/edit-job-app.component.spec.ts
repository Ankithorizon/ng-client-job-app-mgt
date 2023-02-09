import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobAppComponent } from './edit-job-app.component';

describe('EditJobAppComponent', () => {
  let component: EditJobAppComponent;
  let fixture: ComponentFixture<EditJobAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditJobAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
