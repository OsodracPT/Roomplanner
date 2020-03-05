import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavDFirstfloorComponent } from './pav-d-firstfloor.component';

describe('PavDFirstfloorComponent', () => {
  let component: PavDFirstfloorComponent;
  let fixture: ComponentFixture<PavDFirstfloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavDFirstfloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavDFirstfloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
