import {Component, OnInit, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AltrTableColumn, AltrDialog } from 'src/app/foundation/types';

import { DialogModalService } from 'src/app/foundation/services/dialog-modal.service';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/foundation/services/crud.service';
import { HelperService } from 'src/app/foundation/services/helper.service';
import { ActivatedRoute } from '@angular/router';
import { MustNotMatch } from 'src/app/foundation/validators/must-not-match.validator';
import { filter, first, map, switchMap } from 'rxjs';
import { CategoryModel } from 'src/app/foundation/models/category.model';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  form: FormGroup;
  endPoint = 'category';
  pipeDate = new DatePipe('en-MY');

  constructor(private dialogService: DialogModalService, public crudService: CrudService, 
    public helper: HelperService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.crudService.categoryList = [];
  }
  dataSource: CategoryModel[];
  tableColumn: AltrTableColumn[];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.initializeColumns();
    this.crudService.categoryList = this.route.snapshot.data[this.endPoint];
  }

  // Sorting functionality
  sortData(sortParameters: Sort ): any[] {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.crudService.categoryList = this.crudService.categoryList.sort((a: CategoryModel, b: CategoryModel) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.crudService.categoryList = this.crudService.categoryList.sort((a: CategoryModel, b: CategoryModel) => b[keyName].localeCompare(a[keyName]));
    } else {
      return this.crudService.categoryList = this.route.snapshot.data[this.endPoint];
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
      code: [ content.code],
      name: [content.name ],
      description: [content.description],
      createdBy: [content.createdBy],
      createdDate: [ this.pipeDate.transform(content.createdDate, "dd/MM/yyyy (h:mm a)")],
      updatedBy: [ content.updatedBy ],
      updatedDate: [ this.pipeDate.transform(content.updatedDate, "dd/MM/yyyy (h:mm a)") ]
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
      validators: MustNotMatch(this.crudService, 'code', this.endPoint, this.endPoint)
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
    this.dialogService.confirmed(2)
      .pipe(
        filter((filteredResult: FormGroup) => filteredResult.valid),
        switchMap((result: FormGroup) => {
          return this.crudService.postCreate(result, this.endPoint)
            .pipe(first())
        })
      ).subscribe({
        next: () => {
          this.crudService.refreshCategoryList(this.endPoint);
          this.helper.toastrCreate('create-success', this.endPoint);
          window.location.reload();
        },
        error: error => {
          console.log(error)
        }
      })
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
    this.dialogService.confirmed(1)
      .pipe(
        filter((filteredResult: FormGroup) => filteredResult.value),
        switchMap((result: FormGroup) => {
          return this.crudService.postUpdate(id, result, this.endPoint)
            .pipe(first())
        })
      ).subscribe({
        next: () => {
          this.crudService.refreshCategoryList(this.endPoint);
          this.helper.toastrCreate('update-success', this.endPoint);
        },
        error: error => {
          console.log(error)
        }
      })
  }



  deleteAction(id: number): void {

  }

  resetAction(): void {
    this.form.reset();
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
