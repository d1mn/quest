import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {SuccessComponent} from './pages/success/success.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Form',
      permission: 'MainComponent',
      class: ''
    },
    component: MainComponent,
  }, {
    path: 'success',
    data: {
      title: 'Success',
      permission: 'SuccessComponent',
      class: 'success'
    },
    component: SuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
