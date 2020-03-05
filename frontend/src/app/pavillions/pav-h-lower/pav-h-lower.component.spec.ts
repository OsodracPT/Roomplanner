import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavHLowerComponent } from './pav-h-lower.component';

describe('PavHLowerComponent', () => {
  let component: PavHLowerComponent;
  let fixture: ComponentFixture<PavHLowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavHLowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavHLowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
