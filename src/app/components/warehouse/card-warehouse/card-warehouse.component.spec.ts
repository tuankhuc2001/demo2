import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWarehouseComponent } from './card-warehouse.component';

describe('CardWarehouseComponent', () => {
  let component: CardWarehouseComponent;
  let fixture: ComponentFixture<CardWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardWarehouseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
