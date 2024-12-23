import { Component, inject } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { Router, RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-recruters-list',
  standalone: true,
  imports: [RouterModule,NgFor],
  templateUrl: './recruters-list.component.html',
  styleUrl: './recruters-list.component.css'
})
export class RecruterListComponent {
 testService = inject(TestService);
  router = inject(Router);
  recruters:any[]=[]
  userToDeleteId=''
  showModal = false;

  ngOnInit() {
    this.getAllRecruters();
  }

  getAllRecruters() {
    this.testService.getAllUsers().subscribe((data:any) => {
      this.recruters = data.filter((data:any)=>
       { return data.role ==="boss"}
      );
    });
  }
}
