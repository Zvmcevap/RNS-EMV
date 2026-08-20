import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation';

@Component({
  selector: 'app-side',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent
  ],
  templateUrl: './side.html',
  styleUrls: ['./side.css']
})
export class SideComponent {

  user = {
    name: 'Admin User',
    role: 'Administrator'
  };

}