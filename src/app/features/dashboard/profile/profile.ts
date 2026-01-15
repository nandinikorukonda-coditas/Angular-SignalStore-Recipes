import { Component } from '@angular/core';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Button } from '../../../shared/components/button/button';
import { MatDivider } from '@angular/material/divider';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [MatIconModule,MatCardContent,MatCardModule,Button,MatDivider,DatePipe,CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})

export class Profile {
  // Mock user data
  user: any = {
    id: 101,
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'Software Engineer',
    created_at: '2022-05-15T10:30:00Z',
    updated_at: '2023-12-01T14:15:00Z',
    location: 'Bangalore, India'
  };

  constructor() {}

  // Returns the full name
  fullName(): string {
    return this.user.fullName;
  }

  // Returns the email
  name(): string {
    return this.user.email;
  }

  // Returns the role
  getRoleDisplay(): string {
    return this.user.role;
  }

  // Returns an icon based on role
  getRoleIcon(): string {
    switch (this.user.role.toLowerCase()) {
      case 'admin':
        return 'admin_panel_settings';
      case 'manager':
        return 'supervisor_account';
      default:
        return 'work_outline';
    }
  }

  // Returns the full user object
  currentUser(): any {
    return this.user;
  }

  // Go back action
  goBack(): void {
    console.log('Navigate back');
  }

  // Logout action
  logout(): void {
    console.log('User logged out');
  }
}



