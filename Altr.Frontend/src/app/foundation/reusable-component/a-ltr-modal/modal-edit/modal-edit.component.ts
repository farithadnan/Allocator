import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {
  form: FormGroup;
  shakeIt = false;
  public contentData = this.fetchData();

  constructor(@Inject (MAT_DIALOG_DATA) public data: {
    titleSrc: string;
    contentSrc: FormGroup;
    cancelText: string;
    confirmText: string;
  }, private mdDialogRef: MatDialogRef<ModalEditComponent>) {
    // Copy formgroup to another formgroup
    this.form = data.contentSrc
   }

  ngOnInit(): void {
  }

  public formError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  public cancel(): void {
    this.close(false);
  }

  // Will send result to the dialog opener, place where the dialog is open/initialized
  // in this case the opener is in category component. 
  public close(value: FormGroup | boolean): void {
    this.mdDialogRef.close(value);
  }

  public confirm(): void {
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
