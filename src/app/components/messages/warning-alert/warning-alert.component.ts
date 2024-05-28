import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-warning-alert',
  standalone: true,
  imports: [],
  templateUrl: './warning-alert.component.html',
  styleUrl: './warning-alert.component.css',
})
export class WarningAlertComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
