import { NgModule } from '@angular/core';
import { TechniqueRoutingModule } from './technique-routing.module';
import { TechniqueComponent } from './technique.component';



@NgModule({
  imports: [TechniqueRoutingModule],
  declarations: [TechniqueComponent],
  exports: [TechniqueComponent]
})
export class TechniqueModule { }
