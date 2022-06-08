import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifiedOperatorComponent } from './certified-operator.component';

describe('CertifiedOperatorComponent', () => {
  let component: CertifiedOperatorComponent;
  let fixture: ComponentFixture<CertifiedOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertifiedOperatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifiedOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
