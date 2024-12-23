import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {
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
