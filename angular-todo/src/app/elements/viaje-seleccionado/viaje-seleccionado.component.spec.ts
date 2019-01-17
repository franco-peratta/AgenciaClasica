import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajeSeleccionadoComponent } from './viaje-seleccionado.component';

describe('ViajeSeleccionadoComponent', () => {
  let component: ViajeSeleccionadoComponent;
  let fixture: ComponentFixture<ViajeSeleccionadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajeSeleccionadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajeSeleccionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
