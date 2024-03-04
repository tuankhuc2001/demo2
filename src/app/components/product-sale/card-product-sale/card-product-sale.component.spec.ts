import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductSaleComponent } from './card-product-sale.component';

describe('CardProductSaleComponent', () => {
  let component: CardProductSaleComponent;
  let fixture: ComponentFixture<CardProductSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardProductSaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardProductSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
