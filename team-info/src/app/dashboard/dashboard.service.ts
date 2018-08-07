import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../environment';


@Injectable()
export class DashboardService {

    constructor(public httpService: HttpClient) { }

    getTeams(): Observable<any> {
        return this.httpService.get(environment.apiBaseUrl)
    }

}
