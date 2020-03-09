import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavFLowerComponent } from './pav-f-lower.component';

describe('PavFLowerComponent', () => {
  let component: PavFLowerComponent;
  let fixture: ComponentFixture<PavFLowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavFLowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavFLowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
