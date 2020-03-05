import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavDLowerComponent } from './pav-d-lower.component';

describe('PavDLowerComponent', () => {
  let component: PavDLowerComponent;
  let fixture: ComponentFixture<PavDLowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavDLowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavDLowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
