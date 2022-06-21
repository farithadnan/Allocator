import { Component,Input, OnInit  } from '@angular/core';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent implements OnInit {

  public modalData: any[];
  @Input() titleSource: string;
  @Input() set dataSource(data: any[]) {
    this.setDataSource(data);
  }
  
  constructor() { }

  ngOnInit() {}

  setDataSource(data: any[]) {
    this.modalData = JSON.parse(JSON.stringify(data));
  }
}
