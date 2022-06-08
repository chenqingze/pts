import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifiedApiComponent } from './certified-api.component';

describe('CertifiedApiComponent', () => {
  let component: CertifiedApiComponent;
  let fixture: ComponentFixture<CertifiedApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertifiedApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifiedApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
