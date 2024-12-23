import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-recruters-list',
  standalone: true,
  imports: [NgFor,NgIf,RouterModule],
  templateUrl: './recruters-list.component.html',
  styleUrl: './recruters-list.component.css'
})
export class RecrutersListComponent {
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

  deleteElement(){
    this.testService.deleteUser(this.userToDeleteId).subscribe(data=>{
      this.getAllRecruters();
      this.showModal = !this.showModal;
    })
  }

  toggleModal(id: string | null = null){
    this.showModal = !this.showModal;
    if (id) {
      this.userToDeleteId = id;
    }
  }
}
