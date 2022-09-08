import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AltrTableColumn, AltrDialog, ICategory } from 'src/app/foundation/types';

import { DialogModalService } from 'src/app/foundation/services/dialog-modal.service';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/foundation/services/crud.service';
import { HelperService } from 'src/app/foundation/services/helper.service';
import { ActivatedRoute } from '@angular/router';
import { MustNotMatch } from 'src/app/foundation/validators/must-not-match.validator';
import { filter, map, switchMap } from 'rxjs';
import { CategoryModel } from 'src/app/foundation/models/category.model';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  form: FormGroup;
  endPoint = 'category';

  constructor(private dialogService: DialogModalService, public crudService: CrudService, 
    public helper: HelperService, private route: ActivatedRoute, private fb: FormBuilder) {
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
        this.addEditControls(this.fetchCategory(columnId));
        this.submitEdit(columnId);
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
    this.dialogService.openView(this.assignViewContent(id));
  }

  assignViewContent(id: number): AltrDialog {
    return {
      titleSrc: 'View Category',
      contentSrc: this.patchViewForm(this.fetchCategory(id)),
      cancelText: 'Close',
      confirmText: ''
    }
  }

  patchViewForm(content: CategoryModel): FormGroup {
    return this.fb.group({
      id: [content.id],
      code: [ content.code],
      name: [content.name ],
      description: [content.description],
      createdBy: [content.createdBy],
      createdDate: [content.createdDate],
      updatedBy: [ content.updatedBy ],
      updatedDate: [ content.updatedDate ]
    })
  }



  createAction(): void {
    // Trigger opening modal action, with an object parameter
    this.dialogService.openCreate(this.assignCreateContent());
    this.submitCreate();
  }

  patchCreateForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(50)]],
    },
    {
      validators: MustNotMatch(this.crudService, 'code', 'category', 'category')
    } as AbstractControlOptions);
  }

  assignCreateContent(): AltrDialog {
    return {
      titleSrc: 'Create Category',
      contentSrc: this.patchCreateForm(),
      cancelText: 'Close',
      confirmText: 'Create'
    }
  }

  submitCreate(): void {
    // Receive result after the modal is finish closing 
    this.dialogService.confirmed()
      .pipe(
        filter((filteredResult: FormGroup) => filteredResult.value),
        switchMap((result: FormGroup) => {
          return this.crudService.postCreate(result, this.endPoint)
            .pipe(map(() => {
              this.crudService.refreshList('category', 'category');
              this.helper.toastrCreate('create-success', 'category');
            }))
        })
      ).subscribe()
  }



  editAction(id: number): void {
    // Trigger opening modal action, with an object parameter
    this.dialogService.openEdit(this.assignEditContent(id)); 
  }

  patchEditForm(content: CategoryModel): FormGroup {
    return this.form = this.fb.group({
      description: [content.description, [Validators.required, Validators.maxLength(50)]],   
    });
  }

  assignEditContent(id: number): AltrDialog {
    return {
      titleSrc: 'Edit Category',
      contentSrc: this.patchEditForm(this.fetchCategory(id)),
      cancelText: 'Close',
      confirmText: 'Confirm'
    }
  }

  addEditControls(content: CategoryModel): void {
    this.form.addControl('id', new FormControl(content.id));
    this.form.addControl('code', new FormControl(content.code));
    this.form.addControl('name', new FormControl(content.name));
    this.form.addControl('createdBy', new FormControl(content.createdBy));
    this.form.addControl('createdDate', new FormControl(content.createdDate));
    this.form.addControl('updatedBy', new FormControl(content.updatedBy));
    this.form.addControl('updatedDate', new FormControl(content.updatedDate));
  }

  submitEdit(id: number): void {
    this.dialogService.confirmed()
      .pipe(
        filter((filteredResult: FormGroup) => filteredResult.value),
        switchMap((result: FormGroup) => {
          return this.crudService.postUpdate(id, result, this.endPoint)
            .pipe(map(() => {
              this.crudService.refreshList('category', 'category');
              this.helper.toastrCreate('update-success', 'category');
            }))
        })
      ).subscribe()
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

  // Fetch specific category
  fetchCategory(id: number): CategoryModel {
    return this.crudService.categoryList.find(x => x.id === id);
  }

  // Table column assignment
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
