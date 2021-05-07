// Native
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// Modules
import {MainModule} from './main/main.module';
import {SuccessModule} from './success/success.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainModule,
    SuccessModule
  ]
})
export class PagesModule { }
