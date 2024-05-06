import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent implements OnInit {
  @Input({ alias: 'message' }) message!: string;
  @Input({ alias: 'styles' }) style!: string;
  @Output() close!: EventEmitter<void>;

  constructor() {
    this.close = new EventEmitter<void>();
  }
  ngOnInit(): void {
    this.closeMessage();
  }

  closeMessage(): void {
    this.close.emit();
  }
}
