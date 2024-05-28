import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-success-alert',
  standalone: true,
  imports: [],
  templateUrl: './success-alert.component.html',
  styleUrl: './success-alert.component.css',
})
export class SuccessAlertComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
