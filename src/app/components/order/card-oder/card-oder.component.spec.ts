import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOderComponent } from './card-oder.component';

describe('CardOderComponent', () => {
  let component: CardOderComponent;
  let fixture: ComponentFixture<CardOderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardOderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardOderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
