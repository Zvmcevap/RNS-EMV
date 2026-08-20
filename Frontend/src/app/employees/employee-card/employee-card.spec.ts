import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-card.html',
  styleUrls: ['./employee-card.css']
})
export class EmployeeCardComponent {

  @Input() employee: any;

  @Output() delete = new EventEmitter<string>();

  onDelete() {
    if (confirm(`Delete ${this.employee.firstName} ${this.employee.lastName}?`)) {
      this.delete.emit(this.employee._id);
    }
  }

  getFullName(): string {
    return `${this.employee.firstName} ${this.employee.lastName}`;
  }

}