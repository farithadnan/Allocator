import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {
  shakeIt = false;
  
  constructor(@Inject (MAT_DIALOG_DATA) public data: {
    titleSrc: string;
    contentSrc: FormGroup | string;
    cancelText: string;
    confirmText: string;
  }, private mdDialogRef: MatDialogRef<ModalConfirmComponent>) { }

  ngOnInit(): void {
  }

  public cancel(): void {
    this.close(false);
  }

  public close(value: boolean): void {
    this.mdDialogRef.close(value);
  }

  public confirm(): void {
    this.close(true);
  }
}
