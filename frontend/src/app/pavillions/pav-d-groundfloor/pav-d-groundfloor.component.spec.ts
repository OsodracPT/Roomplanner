import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavDGroundfloorComponent } from './pav-d-groundfloor.component';

describe('PavDGroundfloorComponent', () => {
  let component: PavDGroundfloorComponent;
  let fixture: ComponentFixture<PavDGroundfloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavDGroundfloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavDGroundfloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
