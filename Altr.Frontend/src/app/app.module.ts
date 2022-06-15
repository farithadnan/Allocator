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
import { NavigationComponent } from './navigation/navigation.component';
import { SidebarContentComponent } from './sidebar-content/sidebar-content.component';

// To make our code much more cleaner
const Ux_Modules = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
]

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SidebarContentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    RoutingModule,
    Ux_Modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
