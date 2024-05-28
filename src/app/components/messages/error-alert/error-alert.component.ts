import { Component, Input, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [],
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.css',
})
export class ErrorAlertComponent implements OnInit {
  @Input() message: string = '';
  ngOnInit() {
    initFlowbite();
  }
}
