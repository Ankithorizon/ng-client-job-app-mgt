import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePersonalInfoComponent } from './create-personal-info.component';

describe('CreatePersonalInfoComponent', () => {
  let component: CreatePersonalInfoComponent;
  let fixture: ComponentFixture<CreatePersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePersonalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
