import { Component, inject } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-recruter-jobs',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './recruter-jobs.component.html',
  styleUrl: './recruter-jobs.component.css'
})
export class RecruterJobsComponent {
 testService = inject(TestService);
  router = inject(Router);
  jobs:any[]=[]
  jobToDeleteId=''
  showModal = false;

  ngOnInit() {
    this.getAllJobs();
  }

  getAllJobs() {
    const userId = localStorage.getItem('id');
    this.testService.getAllJobs().subscribe((data: any) => {
      if (data && data.jobPosts) {
        this.jobs = data.jobPosts.filter((job: any) => job.userId && job.userId._id === userId);
      } else {
        this.jobs = [];
      }
    });
  }
  toggleModal(id: string | null = null){
    this.showModal = !this.showModal;
    if (id) {
      this.jobToDeleteId = id;
    }
  }

  deleteElement(){
    this.testService.deleteJob(this.jobToDeleteId).subscribe(data=>{
      this.getAllJobs();
      this.showModal = !this.showModal;
    })
  }
}
