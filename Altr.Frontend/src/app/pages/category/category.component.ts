import { formatDate } from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AltrTableColumn, ICategory } from 'src/app/foundation/types';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor() { }
  dataSource: ICategory[];
  tableColumn: AltrTableColumn[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.initializeColumns();
    this.dataSource = this.getDataSource();
  }


  // Sorting functionality
  sortData(sortParameters: Sort ): any[] {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.dataSource = this.dataSource.sort((a: ICategory, b: ICategory) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.dataSource = this.dataSource.sort((a: ICategory, b: ICategory) => b[keyName].localeCompare(a[keyName]));
    } else {
      return this.dataSource = this.getDataSource();
    }
  }

  // Table action 
  manageTblAction(dataObj: object): void {
    const columnId = dataObj['columnId'];
    const action = dataObj['action'];

    console.log('id: ' + columnId + '\n action: ' + action);

    switch(action){
      case 'edit':{
        this.editAction(columnId);
        break;
      }
      case 'delete':{
        this.deleteAction(columnId);
        break;
      }
      default: {
        break;
      }
    }
  }

  createAction(): void {

  }

  editAction(id: number): void {

  }

  deleteAction(id: number): void {

  }

  printAction(): void {

  }
  // Column initialization
  initializeColumns(): void {
    this.tableColumn = [
      {
        name: 'Code',
        dataKey: 'code',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Name',
        dataKey: 'name',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Description',
        dataKey: 'description',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Created By',
        dataKey: 'createdBy',
        position: 'left',
        isSortable: true

      },
      {
        name: 'Created Date',
        dataKey: 'createdDate',
        position: 'left',
        isSortable: true
      }
    ]
  }

  // Fetching data source
  getDataSource(): any[] {
    return [{
      id: 1,
      code: 'CAT-001',
      name: 'Category 1',
      description: 'This is the first category',
      createdBy: 'Admin',
      createdDate: formatDate(new Date(), 'dd/MM/yyyy', 'en-US'),
      updatedBy: 'Admin',
      updatedDate: formatDate(new Date(), 'dd/MM/yyyy', 'en-US'),
    },
    {
      id: 123,
      code: 'CAT-123',
      name: 'Category 123',
      description: 'This is the One Hundred and twenty three category',
      createdBy: 'Admin',
      createdDate: formatDate(new Date(), 'dd/MM/yyyy', 'en-US'),
      updatedBy: 'Admin',
      updatedDate: formatDate(new Date(), 'dd/MM/yyyy', 'en-US'),
    }
  ]
  }

}
