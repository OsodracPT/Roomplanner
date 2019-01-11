import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavCComponent } from './pav-c.component';

describe('PavCComponent', () => {
  let component: PavCComponent;
  let fixture: ComponentFixture<PavCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
