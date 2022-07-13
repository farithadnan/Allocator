import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryModel } from '../models/category.model';
import { EmptyError, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }
  readonly  apiURL = 'http://localhost:5000/api';

  categoryList: CategoryModel[];

  postCreate(formData: FormGroup, endpoint: string) {
    return this.http.post(`${this.apiURL}/${endpoint}`, formData.value);
  }

  postUpdate(id: number, formData: FormGroup, endpoint: string) {
    return this.http.put(`${this.apiURL}/${endpoint}/${id}`, formData.value)
  }

  postDelete(id: number,  endpoint: string) {
    return this.http.delete(`${this.apiURL}/${endpoint}/${id}`);
  }

  fetchAllDetail(type: string, endPoint: string) {
    switch(type.toLowerCase()) {
      case 'category': {
        return this.http.get<CategoryModel[]>(`${this.apiURL}/${endPoint}`);
      }
    }
  }

  refreshList(type: string, endpoint: string) {
    switch(type.toLowerCase()) {
      case 'category' : {
        lastValueFrom(this.http.get(`${this.apiURL}/${endpoint}`)).then(res => {
          this.categoryList = res as CategoryModel[]
        }).catch((error: EmptyError) => {
          console.log(error.message)
        })
        break;
      }
    }
  }
}
