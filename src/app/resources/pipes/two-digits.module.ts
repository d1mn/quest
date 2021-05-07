import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TwoDigitsPipe} from './two-digits.pipe';



@NgModule({
  declarations: [
    TwoDigitsPipe
  ],
  exports: [
    TwoDigitsPipe
  ],
  imports: [
    CommonModule,
  ]
})
export class TwoDigitsModule { }
