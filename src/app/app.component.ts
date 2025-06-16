import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgForOf} from '@angular/common';

type Notification = {id: number, value: string};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
class AppComponent {
  title = 'angular-ui';

  private ws = new WebSocket("ws://localhost:8080/ws");
  public notifications: Notification[] = [];

  ngOnInit() {
    // fetch('/api/users', {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    // }).then(() => {})
    // fetch('/api/cars', {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    // }).then(() => {})
    fetch('/api/notification', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    }).then(async (response) => {
      this.notifications = await response.json();
    })

    this.ws.onmessage = (event) => {
      this.notifications.push(JSON.parse(event.data));
    };
  }

  sendMessage(event: Event) {
    const input = event.target as HTMLInputElement;
    const message = input.value;

    this.ws.send(message);
    input.value = '';
  }
}

export { AppComponent };
