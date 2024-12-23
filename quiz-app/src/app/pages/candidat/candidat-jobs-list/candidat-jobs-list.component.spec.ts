import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatJobsListComponent } from './candidat-jobs-list.component';

describe('CandidatJobsListComponent', () => {
  let component: CandidatJobsListComponent;
  let fixture: ComponentFixture<CandidatJobsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatJobsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatJobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
