import { AfterViewInit, Component, ViewChild, ChangeDetectorRef, HostBinding, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogModalService } from '../foundation/services/dialog-modal.service';
import { LoadingService } from '../foundation/services/loading.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit, OnInit {
  loading: boolean = false;

  @ViewChild(MatSidenav)
  sidenav!  : MatSidenav;
  isOpen = false;

  @HostBinding('class') className = '';
  toggleControl = new FormControl(false);
  darkClassName = 'darkMode';

  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef, 
              private overlay: OverlayContainer, private _loading: LoadingService) { }

  ngOnInit(): void {
    this.listenToLoading();

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      this.className = darkMode ? this.darkClassName : '';

      if (darkMode) {
        this.overlay.getContainerElement().classList.add(this.darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(this.darkClassName);
      }
    });
  }

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

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

}
