import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-candidat',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './candidat.component.html',
  styleUrl: './candidat.component.css'
})
export class CandidatComponent {

}
