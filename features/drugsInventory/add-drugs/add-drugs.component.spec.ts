import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrugsComponent } from './add-drugs.component';

describe('AddDrugsComponent', () => {
  let component: AddDrugsComponent;
  let fixture: ComponentFixture<AddDrugsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDrugsComponent]
    });
    fixture = TestBed.createComponent(AddDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
