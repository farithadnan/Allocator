import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalViewComponent } from '../reusable-component/a-ltr-modal/modal-view/modal-view.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DialogModalService {

  constructor(private dialog: MatDialog) { }

  dialogRef: MatDialogRef<ModalViewComponent>;

  public openView(options) {
    this.dialogRef = this.dialog.open(ModalViewComponent, {
      data: {
        titleSrc: options.titleSrc,
        contentSrc: options.contentSrc,
        cancelText: options.cancelText,
      }
    });
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
      return res;
    }
    ));
  }
}
