import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportWarehoseComponent } from './import-warehose.component';

describe('ImportWarehoseComponent', () => {
  let component: ImportWarehoseComponent;
  let fixture: ComponentFixture<ImportWarehoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportWarehoseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportWarehoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
