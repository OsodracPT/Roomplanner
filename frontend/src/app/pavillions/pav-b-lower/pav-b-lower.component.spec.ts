import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavBLowerComponent } from './pav-b-lower.component';

describe('PavBLowerComponent', () => {
  let component: PavBLowerComponent;
  let fixture: ComponentFixture<PavBLowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavBLowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavBLowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
