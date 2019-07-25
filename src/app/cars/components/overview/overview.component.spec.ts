import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
  let component: CarOverviewComponent;
  let fixture: ComponentFixture<CarOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
