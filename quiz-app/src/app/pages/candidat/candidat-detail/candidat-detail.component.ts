import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidate-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidat-detail.component.html',
  styleUrl: './candidat-detail.component.css'
})
export class CandidateDetailComponent {
 candidateId: string | null = null;
  candidate: any = null;
  score: any = null;
  candidateService = inject(TestService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.candidateId = localStorage.getItem('id')+'';

   this.fetchCandidateDetails(this.candidateId)
   this.fetchCandidateResult(this.candidateId)
  }

  fetchCandidateDetails(id: string): void {
    this.candidateService.getUserById(id).subscribe(
      (data) => (this.candidate=data
      ),
      (error) => console.error('Error fetching candidate details:', error)
    );
  }

  fetchCandidateResult(id: string): void {
    this.candidateService.getQuizResultByUser(id).subscribe(
      (data) => ( this.score=data.results[0].score )
      )
  }
}
