import { Component,Inject, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent implements OnInit {
  
  constructor(@Inject (MAT_DIALOG_DATA) public data: {
    titleSrc: string;
    contentSrc: any;
    cancelText: string;
  }, private mdDialogRef: MatDialogRef<ModalViewComponent>) { }

  ngOnInit() {}

  public cancel() {
    this.close(false);
  }

  public close(value) {
    this.mdDialogRef.close(value);
  }

}
