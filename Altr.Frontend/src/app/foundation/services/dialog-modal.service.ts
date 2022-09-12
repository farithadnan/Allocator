import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalViewComponent } from '../reusable-component/a-ltr-modal/modal-view/modal-view.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { ModalCreateComponent } from '../reusable-component/a-ltr-modal/modal-create/modal-create.component';
import { ModalEditComponent } from '../reusable-component/a-ltr-modal/modal-edit/modal-edit.component';
import { ModalConfirmComponent } from '../reusable-component/a-ltr-modal/modal-confirm/modal-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogModalService {

  constructor(private dialog: MatDialog) { }
  dialogMode: string = null;
  dialogRefView: MatDialogRef<ModalViewComponent>;
  dialogRefCreate: MatDialogRef<ModalCreateComponent>;
  dialogRefEdit: MatDialogRef<ModalEditComponent>;
  dialogRefConfirm: MatDialogRef<ModalConfirmComponent>;

  //  Fetch dialog opening action for view category modal
  public openView(options: any) {
    this.dialogRefView = this.dialog.open(ModalViewComponent, {
      disableClose: true,
      autoFocus: false,
      data: {
        titleSrc: options.titleSrc,
        contentSrc: options.contentSrc,
        cancelText: options.cancelText,
      }
    });
  }

  //  Fetch dialog opening action of create modal
  public openCreate(options: any) {
    // Open modal with parameter of data
    this.dialogRefCreate = this.dialog.open(ModalCreateComponent, {
      disableClose: true,
      data: {
        titleSrc: options.titleSrc,
        contentSrc: options.contentSrc,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
    })
  }

  // Fetch dialog opening action for edit modal
  public openEdit(options: any) {
    this.dialogRefEdit = this.dialog.open(ModalEditComponent, {
      disableClose: true,
      data: {
        titleSrc: options.titleSrc,
        contentSrc: options.contentSrc,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }    
    })
  }

  public openConfirm(options: any) {
    this.dialogRefConfirm = this.dialog.open(ModalConfirmComponent, {
      disableClose: true,
      data: {
        titleSrc: options.titleSrc,
        contentSrc: options.contentSrc,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }    
    })
  }


  // Fetch current action of a close dialog, in this case it will be categorised by different mode of modal
  public confirmed(): Observable<any> {
    const dialogRefCol = [this.dialogRefView, this.dialogRefEdit, this.dialogRefCreate, this.dialogRefConfirm];
    let endResult$: Observable<any>;
    //  When the dialog is finish closing it will then return the result of observable back to the one who's call this method
    //  in this case, the one who call this message to fetch the result is the one who's calling the openCreate()

    dialogRefCol.forEach((data) => {
      if (data) {
        endResult$ =  data.afterClosed().pipe(take(1), map(res => {
          return res;
        }));
      }
    })

    return endResult$;
  }
}
