import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdatePriceComponent } from './modal-update-price.component';

describe('ModalUpdatePriceComponent', () => {
  let component: ModalUpdatePriceComponent;
  let fixture: ComponentFixture<ModalUpdatePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUpdatePriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUpdatePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
