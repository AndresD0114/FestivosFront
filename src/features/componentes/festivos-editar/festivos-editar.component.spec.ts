import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivosEditarComponent } from './festivos-editar.component';

describe('FestivosEditarComponent', () => {
  let component: FestivosEditarComponent;
  let fixture: ComponentFixture<FestivosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivosEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FestivosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
