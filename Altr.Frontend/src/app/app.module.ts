import { NgModule } from '@angular/core';
import { RoutingModule } from './routing/routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { NavigationComponent } from './navigation/navigation.component';
import { SidebarContentComponent } from './navigation/sidebar-content/sidebar-content.component';
import { CategoryComponent } from './pages/category/category.component';
import { PlannerComponent } from './pages/planner/planner.component';
import { TechniqueComponent } from './pages/technique/technique.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ALtrTableComponent } from './foundation/reusable-component/a-ltr-table/a-ltr-table.component';
import { DataPropertyGetterPipe } from './foundation/reusable-component/a-ltr-table/data-property-getter-pipe/data-property-getter.pipe';
import { ModalViewComponent } from './foundation/reusable-component/a-ltr-modal/modal-view/modal-view.component';

// To make our code much more cleaner
const Ux_Modules = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatDialogModule
]

const Pages_Components = [
  AppComponent,
  NavigationComponent,
  SidebarContentComponent,
  CategoryComponent,
  PlannerComponent,
  TechniqueComponent,
  DashboardComponent
]

@NgModule({
  declarations: [
    Pages_Components,
    ALtrTableComponent,
    DataPropertyGetterPipe,
    ModalViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    RoutingModule,
    Ux_Modules,    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
