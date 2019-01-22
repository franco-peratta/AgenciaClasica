import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionViajesComponent } from './seleccion-viajes.component';

describe('SeleccionViajesComponent', () => {
  let component: SeleccionViajesComponent;
  let fixture: ComponentFixture<SeleccionViajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionViajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
