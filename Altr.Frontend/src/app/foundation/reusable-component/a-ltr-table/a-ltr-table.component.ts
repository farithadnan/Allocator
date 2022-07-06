import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AltrTableColumn } from '../../types';

@Component({
  selector: 'app-custom-table',
  templateUrl: './a-ltr-table.component.html',
  styleUrls: ['./a-ltr-table.component.scss']
})
export class ALtrTableComponent implements OnInit, AfterViewInit {

  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[];
  private columnId = 0;
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort: MatSort;

  // Input from parent component
  @Input() isPageable = false;
  @Input() isSortable  = false;
  @Input() isFilterable = false;
  @Input() tableColumns: AltrTableColumn[];
  @Input() rowActionIcon: string;
  @Input() paginationSizes: number[] = [10, 30, 50, 100];
  @Input() defaultPageSize  = this.paginationSizes[1];

  // Output to parent component
  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction = new EventEmitter<{columnId: number, action: string}>();

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }
  

  constructor() { }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: AltrTableColumn) => tableColumn.name);

    if (this.rowActionIcon) {
      this.displayedColumns = [...columnNames, this.rowActionIcon];
    } else {
      this.displayedColumns = columnNames;
    }
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }

  setTableDataSource(data: any[]) { 
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
      // defining name of data property, to sort by, instead of column name
      sortParameters.active = this.tableColumns.find(column => column.name === sortParameters.active).dataKey;
      this.sort.emit(sortParameters);
  }

  // problem, sec click will change tbl row id to 0 
  fetchInfo(data: any) {
    this.columnId = data.id;
  }

  emitRowAction(actionResult: string) {
    this.rowAction.emit({columnId: this.columnId, action: actionResult});
  }
}
