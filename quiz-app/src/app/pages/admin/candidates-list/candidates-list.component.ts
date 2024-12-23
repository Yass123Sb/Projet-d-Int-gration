import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-candidates-list',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './candidates-list.component.html',
  styleUrl: './candidates-list.component.css'
})
export class CandidatesListComponent {
 testService = inject(TestService);
  router = inject(Router);
  candidates:any[]=[]
  showModal = false;
    userToDeleteId=''

  ngOnInit() {
    this.getAllCandidates();
  }

  getAllCandidates() {
    this.testService.getAllUsers().subscribe((data:any) => {
      this.candidates = data.filter((data:any)=>
       { return data.role ==="candidate"}
      );
    });
  }

  toggleModal(id: string | null = null){
    this.showModal = !this.showModal;
    if (id) {
      this.userToDeleteId = id;
    }
  }

  deleteElement(){
    this.testService.deleteUser(this.userToDeleteId).subscribe(data=>{
      this.getAllCandidates();
      this.showModal = !this.showModal;
    })
  }

}
