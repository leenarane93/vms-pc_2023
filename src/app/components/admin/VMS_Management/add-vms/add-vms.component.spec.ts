import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVmsComponent } from './add-vms.component';

describe('AddVmsComponent', () => {
  let component: AddVmsComponent;
  let fixture: ComponentFixture<AddVmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVmsComponent]
    });
    fixture = TestBed.createComponent(AddVmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
