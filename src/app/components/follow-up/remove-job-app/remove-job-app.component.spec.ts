import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveJobAppComponent } from './remove-job-app.component';

describe('RemoveJobAppComponent', () => {
  let component: RemoveJobAppComponent;
  let fixture: ComponentFixture<RemoveJobAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveJobAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveJobAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
