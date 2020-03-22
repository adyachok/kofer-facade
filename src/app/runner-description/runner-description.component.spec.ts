import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunnerDescriptionComponent } from './runner-description.component';

describe('RunnerDescriptionComponent', () => {
  let component: RunnerDescriptionComponent;
  let fixture: ComponentFixture<RunnerDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunnerDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunnerDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
