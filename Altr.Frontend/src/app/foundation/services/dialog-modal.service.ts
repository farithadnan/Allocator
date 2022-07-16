import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalViewComponent } from '../reusable-component/a-ltr-modal/modal-view/modal-view.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { ModalCreateComponent } from '../reusable-component/a-ltr-modal/modal-create/modal-create.component';

@Injectable({
  providedIn: 'root'
})
export class DialogModalService {

  constructor(private dialog: MatDialog) { }
  dialogMode: string = null;
  dialogRefView: MatDialogRef<ModalViewComponent>;
  dialogRefCreate: MatDialogRef<ModalCreateComponent>;

  //  Fetch dialog opening action for view category modal
  public openView(options: any) {
    this.dialogRefView = this.dialog.open(ModalViewComponent, {
      data: {
        titleSrc: options.titleSrc,
        contentSrc: options.contentSrc,
        cancelText: options.cancelText,
      }
    });

    if(this.dialogRefView) {
      this.dialogMode = 'view';
    }
  }

  //  Fetch dialog opening action of create category modal
  public openCreate(options: any) {
    // Open modal with parameter of data
    this.dialogRefCreate = this.dialog.open(ModalCreateComponent, {
      data: {
        titleSrc: options.titleSrc,
        contentSrc: options.contentSrc,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
    })

    if(this.dialogRefCreate) {
      this.dialogMode = 'create';
    }
  }

  // Fetch current action of a close dialog, in this case it will be categorised by different mode of modal
  public confirmed(): Observable<any> {

    //  When the dialog is finish closing it will then return the result of observable back to the one who's call this method
    //  in this case, the one who call this message to fetch the result is the one who's calling the openCreate()
    if (this.dialogMode === 'view') { // maybe can just delete this one?
      return this.dialogRefView.afterClosed().pipe(take(1), map(res => {
        return res;
      }));
    } 
    else {
      return this.dialogRefCreate.afterClosed().pipe(take(1), map(res => {
        return res;
      }));
    }
  }
}
