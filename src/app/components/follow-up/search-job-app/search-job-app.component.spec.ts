import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJobAppComponent } from './search-job-app.component';

describe('SearchJobAppComponent', () => {
  let component: SearchJobAppComponent;
  let fixture: ComponentFixture<SearchJobAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchJobAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJobAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
