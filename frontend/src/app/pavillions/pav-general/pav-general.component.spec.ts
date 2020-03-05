import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavGeneralComponent } from './pav-general.component';

describe('PavGeneralComponent', () => {
  let component: PavGeneralComponent;
  let fixture: ComponentFixture<PavGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
