import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GoodsDetialComponent} from './goods-detial.component';

describe('GoodsDetialComponent', () => {
  let component: GoodsDetialComponent;
  let fixture: ComponentFixture<GoodsDetialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoodsDetialComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
