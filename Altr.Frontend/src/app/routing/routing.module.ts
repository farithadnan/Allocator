import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CategoryResolverService } from '../foundation/resolver/category-resolver.service';
import { TechniqueResolverService } from '../foundation/resolver/technique-resolver.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: 'dashboard', loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'technique', loadChildren: () => import('../pages/technique/technique.module').then(m => m.TechniqueModule), 
    resolve: {
      technique: TechniqueResolverService
    }
  },
  { path: 'category', runGuardsAndResolvers: 'always',
  loadChildren: () => import('../pages/category/category.module').then(m => m.CategoryModule), 
    resolve: {
      category: CategoryResolverService
    } 
  },
  { path: 'planner', loadChildren: () => import('../pages/planner/planner.module').then(m => m.PlannerModule) },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
