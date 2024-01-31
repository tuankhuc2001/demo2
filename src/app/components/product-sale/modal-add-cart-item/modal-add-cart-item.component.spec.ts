import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddCartItemComponent } from './modal-add-cart-item.component';

describe('ModalAddCartItemComponent', () => {
  let component: ModalAddCartItemComponent;
  let fixture: ComponentFixture<ModalAddCartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAddCartItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAddCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
