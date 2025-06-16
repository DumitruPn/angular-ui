import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
class AppComponent {
  title = 'angular-ui';

  private ws = new WebSocket("ws://localhost:8080/ws");
  public messageFromServer = "";

  ngOnInit() {
    // fetch('/api/users', {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    // }).then(() => {})
    // fetch('/api/cars', {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    // }).then(() => {})

    this.ws.onmessage = (event) => {
      this.messageFromServer = event.data;
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
