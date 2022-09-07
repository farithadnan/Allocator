import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IDropdown } from '../types';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private toastr: ToastrService) { }

  toastrCreate(type: string, endpoint: string): void {
    let titleMsg: string;
    let contentMsg: string;

    switch(type) {
      case 'create-success': {
        titleMsg = 'Create Success'
        contentMsg = `New ${endpoint} has been successfully added!`;
        this.toastrBlaster(titleMsg, contentMsg, 'success');
        break;
      }
      case 'create-fail-duplicate': {
        titleMsg = 'Create Error';
        contentMsg = `${endpoint} is already existed!`;
        this.toastrBlaster(titleMsg, contentMsg, 'error');
        break;
      }
      case 'update-success': {
        titleMsg = 'Update Success'
        contentMsg = `${endpoint} has been successfully updated!`;
        this.toastrBlaster(titleMsg, contentMsg, 'success');
        break;      
      }
    }
  }

  toastrBlaster(titleMsg: string = '', contentMsg: string, toastrType: string): void {
    switch (toastrType) {
      case 'success' : {
        this.toastr.success(contentMsg, titleMsg);
        break;
      }
      case 'info' : {
        this.toastr.info(contentMsg, titleMsg);
        break;
      }
      case 'warning' : {
        this.toastr.warning(contentMsg, titleMsg);
        break;
      }
      case 'error' : {
        this.toastr.error(contentMsg, titleMsg);
        break;
      }
      default: {
        this.toastr.error('Toastr Type Does\'t Exist!, Error');
        break;
      }
    }
  }

}
