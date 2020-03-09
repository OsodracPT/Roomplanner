import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavHComponent } from './pav-h.component';

describe('PavHComponent', () => {
  let component: PavHComponent;
  let fixture: ComponentFixture<PavHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
