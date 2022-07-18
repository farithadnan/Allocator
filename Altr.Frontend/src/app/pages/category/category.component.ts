import { formatDate } from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AltrCreateDialog, AltrTableColumn, AltrViewDialog, ICategory } from 'src/app/foundation/types';

import { DialogModalService } from 'src/app/foundation/services/dialog-modal.service';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/foundation/services/crud.service';
import { HelperService } from 'src/app/foundation/services/helper.service';
import { ActivatedRoute } from '@angular/router';
import { MustNotMatch } from 'src/app/foundation/validators/must-not-match.validator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  form: FormGroup;
  endPoint = 'category';

  constructor(private dialogService: DialogModalService, public crudService: CrudService, public helper: HelperService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.crudService.categoryList = [];
  }
  dataSource: ICategory[];
  tableColumn: AltrTableColumn[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.initializeColumns();
    this.crudService.categoryList = this.route.snapshot.data['category'];
  }


  // Sorting functionality
  sortData(sortParameters: Sort ): any[] {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.crudService.categoryList = this.crudService.categoryList.sort((a: ICategory, b: ICategory) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.crudService.categoryList = this.crudService.categoryList.sort((a: ICategory, b: ICategory) => b[keyName].localeCompare(a[keyName]));
    } else {
      return this.crudService.categoryList = this.route.snapshot.data['category'];
    }
  }

  // Table action 
  manageTblAction(dataObj: object): void {
    const columnId = dataObj['columnId'];
    const action = dataObj['action'];

    switch(action){
      case 'view': {
        this.viewAction(columnId);
        break;
      }
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

  viewAction(id: number): void { 
    const content = this.crudService.categoryList.find(x => x.id === id);

    this.form = this.fb.group({
      id: [content.id],
      code: [ content.code],
      name: [content.name ],
      description: [content.description],
      createdBy: [content.createdBy],
      createdDate: [content.createdDate],
      updatedBy: [ content.updatedBy ],
      updatedDate: [ content.updatedDate ]
    })

    const options: AltrViewDialog = {
      titleSrc: 'View Category',
      contentSrc: this.form,
      cancelText: 'Close'
    }

    this.dialogService.openView(options);
  }

  createAction(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(50)]],
    },
    {
      validators: MustNotMatch(this.crudService, 'code', 'category', 'category')
    } as AbstractControlOptions);

    // Neeeded for reusable modal
    const options: AltrCreateDialog = {
      titleSrc: 'Create Category',
      contentSrc: this.form,
      cancelText: 'Close',
      confirmText: 'Confirm'
    }

    // Trigger opening modal action, with an object parameter
    this.dialogService.openCreate(options);

    // Receive result after the modal is finish closing 
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        // now can execute submission process for creating action
        this.crudService.postCreate(confirmed, this.endPoint).subscribe({
          complete: () => {
            this.crudService.refreshList('category', 'category');
            this.helper.toastrCreate('create-success', 'category');
          }
        })
      }
    });
  }

  editAction(id: number): void {

  }

  deleteAction(id: number): void {

  }

  resetAction(): void {
    this.form.reset();

    for (const key of Object.keys(this.form.controls)) {
      this.form.controls[key].markAsPristine();
      this.form.controls[key].updateValueAndValidity();
    }
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

}
