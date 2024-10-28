import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalyDetectComponent } from './anomaly-detect.component';

describe('AnomalyDetectComponent', () => {
  let component: AnomalyDetectComponent;
  let fixture: ComponentFixture<AnomalyDetectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnomalyDetectComponent]
    });
    fixture = TestBed.createComponent(AnomalyDetectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
