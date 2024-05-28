/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection,
} from '@angular/core';

bootstrapApplication(AppComponent, appConfig);
