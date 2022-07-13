import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }
  readonly  apiURL = 'http://localhost:5000/api/category';

  postCreate(formData: FormGroup) {
    return this.http.post(this.apiURL, formData.value);
  }

  postUpdate(id: number, formData: FormGroup) {
    return this.http.put(`${this.apiURL}/${id}`, formData.value)
  }

  postDelete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
