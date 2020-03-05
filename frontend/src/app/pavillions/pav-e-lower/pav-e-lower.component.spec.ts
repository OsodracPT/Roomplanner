import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavELowerComponent } from './pav-e-lower.component';

describe('PavELowerComponent', () => {
  let component: PavELowerComponent;
  let fixture: ComponentFixture<PavELowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavELowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavELowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
