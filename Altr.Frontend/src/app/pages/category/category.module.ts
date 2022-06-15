import { NgModule } from '@angular/core';
import { CategoryComponent } from './category.component';
import { CategoryRoutingModule } from './category-routing.module';



@NgModule({
  imports: [CategoryRoutingModule],
  declarations: [CategoryComponent],
  exports: [CategoryComponent]
})
export class CategoryModule { }
