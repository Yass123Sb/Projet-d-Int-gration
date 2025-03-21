import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatOffersComponent } from './candidat-offers.component';

describe('CandidatOffersComponent', () => {
  let component: CandidatOffersComponent;
  let fixture: ComponentFixture<CandidatOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatOffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
