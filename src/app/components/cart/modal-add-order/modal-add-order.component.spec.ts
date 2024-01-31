import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddOrderComponent } from './modal-add-order.component';

describe('ModalAddOrderComponent', () => {
  let component: ModalAddOrderComponent;
  let fixture: ComponentFixture<ModalAddOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAddOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAddOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
