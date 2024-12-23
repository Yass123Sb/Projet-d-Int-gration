import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css',
})
export class JobDetailComponent {
  activatedRoute = inject(ActivatedRoute);
  jobPost: any = null;
  testService = inject(TestService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  candidateApplied = false;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.testService.getjobById(params['id']).subscribe((data: any) => {
        this.jobPost = data.jobPost;
        console.log(data.jobPost);
        this.isCandidatePosted();  
      });
    });
  }
  postuler() {
    let offer = {
      userId: localStorage.getItem('id'),
      JobPostId: this.jobPost._id,
      status: 'pending',
      recruterId: this.jobPost.userId._id,
    };
    this.testService.addOffer(offer).subscribe((data) => {
      window.alert('Demande ajoutée avec succès');
      this.router.navigate(['/candidat']);
    });
  }

  isCandidatePosted() {
    let candidateId = localStorage.getItem('id');
    this.testService.getOfferByCandidat(candidateId).subscribe((data: any) => {
      console.log(data);
      if (data.offers.some((offer:any) => offer.JobPostId._id === this.jobPost._id)) {
        this.candidateApplied = true; 
      }
    });
  }

}
