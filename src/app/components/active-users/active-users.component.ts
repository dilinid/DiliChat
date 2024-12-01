import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface User {
  username: string;
  profilePicture: string;
}

@Component({
  selector: 'app-active-users',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './active-users.component.html',
  styleUrl: './active-users.component.css'
})

export class ActiveUsersComponent implements OnInit {
  activeUsers: User[] = [
    { username: 'Dili D', profilePicture: 'https://example.com/profile1.jpg'},
    { username: 'Abhii R', profilePicture: 'https://example.com/profile2.jpg'},
    // Add more active users here
  ];

  constructor() { }

  ngOnInit(): void {
    // Fetch active users from an API or service if needed
  }
}
