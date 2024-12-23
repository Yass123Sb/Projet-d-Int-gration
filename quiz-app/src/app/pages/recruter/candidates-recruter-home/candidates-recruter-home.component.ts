import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-candidates-recruter-home',
  standalone: true,
  imports: [NgFor,NgIf,RouterModule],
  templateUrl: './candidates-recruter-home.component.html',
  styleUrl: './candidates-recruter-home.component.css'
})
export class CandidatesRecruterHomeComponent {
 testService = inject(TestService);
  router = inject(Router);
  candidates:any[]=[]
  showModal = false;
    userToDeleteId=''

  ngOnInit() {
    this.getAllRecruters();
  }

  getAllRecruters() {
    this.testService.getAllUsers().subscribe((data:any) => {
      this.candidates = data.filter((data:any)=>
       { return data.role ==="boss"}
      );
    });
  }
}
