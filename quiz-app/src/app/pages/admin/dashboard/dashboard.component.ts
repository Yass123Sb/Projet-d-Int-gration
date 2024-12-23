import { Component, inject } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 testService = inject(TestService);
  router = inject(Router);
  recruters:any[]=[]
  candidates:any[]=[]
  jobs:any[]=[]
  ngOnInit() {
    this.getAllRecruters();
    this.getAllCandidates();
    this.getAllJobs();
  }
  getAllJobs() {
    this.testService.getAllJobs().subscribe((data:any) => {
      this.jobs = data.jobPosts;
    });
  }
  getAllCandidates() {
    this.testService.getAllUsers().subscribe((data:any) => {
      this.candidates = data.filter((data:any)=>
       { return data.role ==="candidate"}
      );
  
      
    });
  }
  getAllRecruters() {
    this.testService.getAllUsers().subscribe((data:any) => {
      this.recruters = data.filter((data:any)=>
       { return data.role ==="boss"}
      );
    });
  }
}
