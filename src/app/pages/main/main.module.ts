import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TwoDigitsModule} from '../../resources/pipes/two-digits.module';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TwoDigitsModule
  ]
})
export class MainModule { }
