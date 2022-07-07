import { AfterViewInit, Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!  : MatSidenav;
  isOpen = false;

  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        
        if(res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.isOpen = true;
        }
      })

      // manually trigger change detection for the current component. 
      this.cdr.detectChanges();
  }

  clicked()
  {
    this.isOpen = !this.isOpen;
  }

}
