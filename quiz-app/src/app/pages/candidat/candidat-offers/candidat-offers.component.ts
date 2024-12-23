import { Component, inject } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-candidat-offers',
  standalone: true,
  imports: [NgFor,NgIf,RouterModule,CommonModule ],
  templateUrl: './candidat-offers.component.html',
  styleUrl: './candidat-offers.component.css'
})
export class CandidatOffersComponent {
 testService = inject(TestService);
  router = inject(Router);
  offers:any[]=[]
  userToDeleteId=''
  showModal = false;

  ngOnInit() {
    this.getAllOffer();
  }

  getAllOffer() {
    let id=localStorage.getItem('id')
    this.testService.getOfferByCandidat(id).subscribe((data:any) => {
   this.offers=data.offers
   console.log(data.offers);
   
    });
  }

  deleteElement(){
    this.testService.deleteOffer(this.userToDeleteId).subscribe(data=>{
      this.getAllOffer();
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
