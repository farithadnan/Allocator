import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryModel } from '../models/category.model';
import { EmptyError, lastValueFrom } from 'rxjs';
import { TechniqueModel } from '../models/technique.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }
  readonly  apiURL = 'http://localhost:5000/api';

  categoryList: CategoryModel[]
  techniqueList: TechniqueModel[];

  postCreate(formData: FormGroup, endpoint: string) {
    return this.http.post(`${this.apiURL}/${endpoint}`, formData.value);
  }

  postUpdate(id: number, formData: FormGroup, endpoint: string) {
    return this.http.put(`${this.apiURL}/${endpoint}/${id}`, formData.value)
  }

  postDelete(id: number,  endpoint: string) {
    return this.http.delete(`${this.apiURL}/${endpoint}/${id}`);
  }

  fetchAllCategoryDetail(endPoint: string) {
    return this.http.get<CategoryModel[]>(`${this.apiURL}/${endPoint}`);
  }

  fetchAllTechniqueDetail(endPoint: string) {
    return this.http.get<TechniqueModel[]>(`${this.apiURL}/${endPoint}`);
  }

  refreshCategoryList(endPoint: string) {
    lastValueFrom(this.http.get(`${this.apiURL}/${endPoint}`)).then(res => {
      this.categoryList = res as CategoryModel[]
    }).catch((error: EmptyError) => {
      console.log(error.message)
    }) 
  }

  refreshTechniqueList(endPoint: string) {
    lastValueFrom(this.http.get(`${this.apiURL}/${endPoint}`)).then(res => {
      this.categoryList = res as CategoryModel[]
    }).catch((error: EmptyError) => {
      console.log(error.message)
    }) 
  }

}
