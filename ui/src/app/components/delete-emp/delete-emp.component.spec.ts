import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEmpComponent } from './delete-emp.component';

describe('DeleteEmpComponent', () => {
  let component: DeleteEmpComponent;
  let fixture: ComponentFixture<DeleteEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
