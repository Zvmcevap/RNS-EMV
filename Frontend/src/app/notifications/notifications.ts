import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationService } from '../services/notification.service';
import { Notification } from '../models/notification';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.css']
})
export class NotificationsComponent implements OnInit {

  private notificationService = inject(NotificationService);

  notifications: Notification[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.loading = true;

    this.notificationService.getAll().subscribe({
      next: (response: any) => {
        this.notifications = response.data.notifications;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load notifications';
        this.loading = false;
      }
    });
  }

}