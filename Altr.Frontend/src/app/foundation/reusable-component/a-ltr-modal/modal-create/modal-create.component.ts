import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {
  form: FormGroup;
  public contentData = this.fetchData();

  constructor(@Inject (MAT_DIALOG_DATA) public data: {
    titleSrc: string;
    contentSrc: FormGroup;
    cancelText: string;
    confirmText: string;
  }, private mdDialogRef: MatDialogRef<ModalCreateComponent>, private fb: FormBuilder) {
    // Copy formgroup to another formgroup
    this.form = data.contentSrc
   }

  ngOnInit(): void {
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
    this.close(this.form)
  }

  private fetchData (): { key: string; value: any; }[]{
    return Object.keys(this.data.contentSrc.value).map((key) => {
      return {key: key, value: this.data[key]}
    })
  }
}
