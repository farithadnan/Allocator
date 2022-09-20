import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { filter, map } from 'rxjs';
import { DialogModalService } from 'src/app/foundation/services/dialog-modal.service';
import { AltrDialog } from 'src/app/foundation/types';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {
  form: FormGroup;
  shakeIt = false;
  public contentData = this.fetchData();

  constructor(@Inject (MAT_DIALOG_DATA) public data: {
    titleSrc: string;
    contentSrc: FormGroup;
    cancelText: string;
    confirmText: string;
  }, private mdDialogRef: MatDialogRef<ModalCreateComponent>, 
     private dialogService: DialogModalService) {
    // Copy formgroup to another formgroup
    this.form = data.contentSrc
   }

  ngOnInit(): void {
  }

  public formError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  public cancel(): void {
    if (!this.form.pristine && this.form.touched ) {
      this.dialogService.openConfirm(this.assignConfirmContent())
      this.executeConfirmDialog();
    } else {
      this.close(false);
    }
  }

  assignConfirmContent(): AltrDialog {
    return {
      titleSrc: 'Confirmation',
      contentSrc: 'Are you sure you want to do this?',
      cancelText: 'No',
      confirmText: 'Yes'
    }
  }

  executeConfirmDialog(): void {
    this.dialogService.confirmed(3).pipe(
      filter((resp) => resp),
      map(() => this.close(true))
    ).subscribe()
  }
  

  // Will send result to the dialog opener, place where the dialog is open/initialized
  // in this case the opener is in category component. 
  public close(value: FormGroup | boolean): void {
    this.mdDialogRef.close(value);
  }

  public confirm(): void {
    // Try adding validation here before proceed to backend
    if (this.form.valid) {
      this.close(this.form)
    } else {
      this.shakeIt = true;
      setTimeout(() => {
        this.shakeIt = false;
      }, 3000);
    }
  }

  private fetchData (): { key: string; value: any; }[]{
    return Object.keys(this.data.contentSrc.value).map((key) => {
      return {key: key, value: this.data[key]}
    })
  }
}
