import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteSingleComponent } from './modal-delete-single.component';

describe('ModalDeleteSingleComponent', () => {
  let component: ModalDeleteSingleComponent;
  let fixture: ComponentFixture<ModalDeleteSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDeleteSingleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDeleteSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
