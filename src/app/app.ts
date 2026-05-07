import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private apiService = inject(ApiService);
  message = signal<string>('Loading...');

  ngOnInit() {
    this.apiService.getHello().subscribe({
      next: (res) => this.message.set(res),
      error: () => this.message.set('Failed to connect to backend')
    });
  }
}
