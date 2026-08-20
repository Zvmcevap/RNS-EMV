import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { API_URL } from '../../services/api.config';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-card.html',
  styleUrls: ['./employee-card.css']
})
export class EmployeeCardComponent {
  @Input() employee: any;
  @Input() isAdmin = false; 
  @Output() deleteEmployee = new EventEmitter<string>();

  onDelete(): void {
    if (this.employee && this.employee._id) {
      this.deleteEmployee.emit(this.employee._id);
    }
  }

  getPhotoUrl(photoPath: any): string {
    if (!photoPath || typeof photoPath !== 'string') return '';
    
    if (photoPath.startsWith('http')) {
      return photoPath;
    }
    
    return `${API_URL}/uploads/${photoPath}`; 
  }
}