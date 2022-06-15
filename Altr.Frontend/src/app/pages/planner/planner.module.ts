import { NgModule } from '@angular/core';
import { PlannerComponent } from './planner.component';
import { PlannerRoutingModule } from './planner-routing.module';



@NgModule({
  imports: [PlannerRoutingModule],
  declarations: [PlannerComponent],
  exports: [PlannerComponent]
})
export class PlannerModule { }
