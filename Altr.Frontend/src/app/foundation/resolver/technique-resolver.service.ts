import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CrudService } from '../services/crud.service';

@Injectable({
    providedIn: 'root'
})

export class TechniqueResolverService implements Resolve<any> {
    constructor(private crudService: CrudService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.crudService.fetchAllTechniqueDetail('technique');
    }
}