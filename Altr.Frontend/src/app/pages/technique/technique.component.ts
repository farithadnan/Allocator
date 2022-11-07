import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, map } from 'rxjs';
import { CategoryModel } from 'src/app/foundation/models/category.model';
import { TechniqueModel } from 'src/app/foundation/models/technique.model';
import { CrudService } from 'src/app/foundation/services/crud.service';
import { DialogModalService } from 'src/app/foundation/services/dialog-modal.service';
import { HelperService } from 'src/app/foundation/services/helper.service';
import { AltrDialog, AltrTableColumn } from 'src/app/foundation/types';
import { MustNotMatch } from 'src/app/foundation/validators/must-not-match.validator';

@Component({
  selector: 'app-technique',
  templateUrl: './technique.component.html',
  styleUrls: ['./technique.component.scss']
})
export class TechniqueComponent implements OnInit {
  form: FormGroup;
  endPoint = 'technique';
  pipeDate = new DatePipe('en-MY');
  
  constructor(private dialogService: DialogModalService, public crudService: CrudService, 
    public helper: HelperService, private route: ActivatedRoute, private fb: FormBuilder) { 
      this.crudService.techniqueList = [];
  }

  dataSource: TechniqueModel[];
  tableColumn: AltrTableColumn[];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.initializeColumns();
    this.crudService.techniqueList = this.route.snapshot.data[this.endPoint];
  }


  sortData(sortParameters: Sort ): void {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.crudService.techniqueList = this.crudService.techniqueList.sort((a: TechniqueModel, b: TechniqueModel) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.crudService.techniqueList = this.crudService.techniqueList.sort((a: TechniqueModel, b: TechniqueModel) => b[keyName].localeCompare(a[keyName]));
    } else {
      return this.crudService.techniqueList = this.route.snapshot.data[this.endPoint];
    }
  }

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
        this.addEditControls(this.fetchTechnique(columnId));
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
      titleSrc: 'View Technique',
      contentSrc: this.patchViewData(id),
      cancelText: 'Close',
      confirmText: ''
    }
  }

  patchViewData(id: number): FormGroup {
    const fetchData = this.fetchTechnique(id);
    const FGroup = this.patchFormGroup(fetchData);
    return this.patchFormArray(fetchData, FGroup);
  }

  patchFormArray(content: TechniqueModel, FGroup: FormGroup): FormGroup {
    const FArray = FGroup.controls['categorySets'] as FormArray;

    content.categorySets.forEach((e) => {
      let childGroup = this.fb.group({
        Ccode: [e.code],
        Cname: [e.name],
        Cdescription: [e.description],
        Cpercent: [e.percent]
      })

      FArray.push(childGroup);
    });

    return FGroup;
  }

  patchFormGroup(content: TechniqueModel): FormGroup {
    return this.fb.group({
      code: [ content.code],
      name: [content.name ],
      description: [content.description],
      categorySets: new FormArray([]),
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

  assignCreateContent(): AltrDialog {
    return {
      titleSrc: 'Create Technique',
      contentSrc: this.patchCreateForm(),
      cancelText: 'Close',
      confirmText: 'Create'
    }
  }

  patchCreateForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      categorySets: new FormArray([])
    },
    {
      validators: MustNotMatch(this.crudService, 'code', 'technique', this.endPoint)
    } as AbstractControlOptions);
  }

  submitCreate(): void {
    // Receive result after the modal is finish closing 
    this.dialogService.confirmed(2)
      .pipe(
        filter((filteredResult: FormGroup) => filteredResult.value),
        switchMap((result: FormGroup) => {
          return this.crudService.postCreate(result, this.endPoint)
            .pipe(map(() => {
              this.crudService.refreshTechniqueList(this.endPoint);
              this.helper.toastrCreate('create-success', this.endPoint);
            }))
        })
      ).subscribe()
  }


  editAction(id: number): void {
    // Trigger opening modal action, with an object parameter
    this.dialogService.openEdit(this.assignEditContent(id)); 
  }

  patchEditForm(content: TechniqueModel): FormGroup {
    return this.form = this.fb.group({
      description: [content.description, [Validators.required, Validators.maxLength(50)]],   
    });
  }

  assignEditContent(id: number): AltrDialog {
    return {
      titleSrc: 'Edit Technique',
      contentSrc: this.patchEditForm(this.fetchTechnique(id)),
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
            .pipe(map(() => {
              this.crudService.refreshCategoryList(this.endPoint);
              this.helper.toastrCreate('update-success', this.endPoint);
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
  fetchTechnique(id: number): TechniqueModel {
    return this.crudService.techniqueList.find(x => x.id === id);
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
