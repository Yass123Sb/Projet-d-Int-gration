import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecrutersListComponent } from './recruters-list.component';

describe('RecrutersListComponent', () => {
  let component: RecrutersListComponent;
  let fixture: ComponentFixture<RecrutersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecrutersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecrutersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
