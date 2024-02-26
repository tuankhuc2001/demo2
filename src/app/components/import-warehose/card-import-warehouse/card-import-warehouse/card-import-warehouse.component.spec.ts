import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardImportWarehouseComponent } from './card-import-warehouse.component';

describe('CardImportWarehouseComponent', () => {
  let component: CardImportWarehouseComponent;
  let fixture: ComponentFixture<CardImportWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardImportWarehouseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardImportWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
