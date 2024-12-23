import { Component, inject } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { Router, RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-candidat-jobs-list',
  standalone: true,
  imports: [RouterModule,NgFor],
  templateUrl: './candidat-jobs-list.component.html',
  styleUrl: './candidat-jobs-list.component.css'
})
export class CandidatJobsListComponent {
testService = inject(TestService);
  router = inject(Router);
  jobs:any[]=[]
  jobToDeleteId=''
  showModal = false;

  ngOnInit() {
    this.getAllJobs();
  }

  getAllJobs() {
    this.testService.getAllJobs().subscribe((data:any) => {
      this.jobs = data.jobPosts;
      console.log(data.jobPosts);
      
    });
  }

}
