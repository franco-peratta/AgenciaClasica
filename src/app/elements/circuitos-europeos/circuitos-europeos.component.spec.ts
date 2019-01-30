import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitosEuropeosComponent } from './circuitos-europeos.component';

describe('CircuitosEuropeosComponent', () => {
  let component: CircuitosEuropeosComponent;
  let fixture: ComponentFixture<CircuitosEuropeosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitosEuropeosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitosEuropeosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
