import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOperationsComponent } from './edit-operations.component';

describe('EditOperationsComponent', () => {
  let component: EditOperationsComponent;
  let fixture: ComponentFixture<EditOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
