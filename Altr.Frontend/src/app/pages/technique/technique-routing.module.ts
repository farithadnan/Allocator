import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechniqueComponent } from './technique.component';

const routes: Routes = [
  { path: '', component: TechniqueComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechniqueRoutingModule { }
