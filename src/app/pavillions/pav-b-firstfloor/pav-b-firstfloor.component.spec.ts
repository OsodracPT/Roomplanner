import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavBFirstfloorComponent } from './pav-b-firstfloor.component';

describe('PavBFirstfloorComponent', () => {
  let component: PavBFirstfloorComponent;
  let fixture: ComponentFixture<PavBFirstfloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavBFirstfloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavBFirstfloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
