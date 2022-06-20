import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICategory } from 'src/app/foundation/types';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor() { }
  displayedColumns: string[] = ['code', 'name', 'changedBy', 'changedDate', 'star'];
  dataSource = new MatTableDataSource<ICategory>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

const ELEMENT_DATA: ICategory[] = [
  {id: 1, code: 'FIN', name: 'Financial', description: 'tra', audit: {createdBy: 'Admin', createdDate: new Date(), updatedBy: 'Admin', updatedDate: new Date()}},
];