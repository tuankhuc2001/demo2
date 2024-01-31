import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteAllComponent } from './modal-delete-all.component';

describe('ModalDeleteAllComponent', () => {
  let component: ModalDeleteAllComponent;
  let fixture: ComponentFixture<ModalDeleteAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDeleteAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDeleteAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
