import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputComponent } from './components/input.component';
import { OutputComponent } from './components/output.component';
import { AboutComponent } from './components/about.component';

const routes: Routes = [
  { path: '', component: InputComponent },
  { path: 'output', component: OutputComponent },
  { path: 'about', component: AboutComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
