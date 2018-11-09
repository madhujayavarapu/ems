import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnemplistComponent } from './unemplist.component';

describe('UnemplistComponent', () => {
  let component: UnemplistComponent;
  let fixture: ComponentFixture<UnemplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnemplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnemplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
