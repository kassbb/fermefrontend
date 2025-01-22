import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoulaiyerComponent } from './poulaiyer.component';

describe('PoulaiyerComponent', () => {
  let component: PoulaiyerComponent;
  let fixture: ComponentFixture<PoulaiyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoulaiyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoulaiyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
