import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeCreatorComponent } from './resume-creator.component';

describe('ResumeCreatorComponent', () => {
  let component: ResumeCreatorComponent;
  let fixture: ComponentFixture<ResumeCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
