import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  /*
    const socket = io('http://localhost:3000');
      socket.on('connect', function() {
        console.log('Connected');

        socket.emit('events', { test: 'test' });
        socket.emit('identity', 0, response =>
          console.log('Identity:', response),
        );
      });
      socket.on('events', function(data) {
        console.log('event', data);
      });
      socket.on('exception', function(data) {
        console.log('event', data);
      });
      socket.on('disconnect', function() {
        console.log('Disconnected');
      });
  */
  constructor() {}

  public getMessages(): string[] {
    return JSON.parse(localStorage.getItem('messages') || '[]');
  }

  public addMessage(message: string): void {
    const messages = this.getMessages();
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
  }

  public clearMessages(): void {
    localStorage.setItem('messages', '[]');
  }
}
