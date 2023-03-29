import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MessageService } from './message.service';
import { DataSourceRequestState, toDataSourceRequestString, translateDataSourceResultGroups } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';

const httpOptionsJson = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    fetchgridpostJson(path: string, state: DataSourceRequestState): Observable<GridDataResult> {
        const hasGroups = state.group && state.group.length;
        const formhttpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        return this.http.post(`${environment.apiUrl}${path}`, toDataSourceRequestString(state), formhttpOptions)
            .pipe(
                map((result: any) => (<GridDataResult>{
                    data: hasGroups ? translateDataSourceResultGroups(result.Data) : result.Data,
                    total: result.Total,
                }))
            );
    }

    fetchgridgetJson(path: string, state: DataSourceRequestState): Observable<GridDataResult> {
        const queryStr = toDataSourceRequestString(state); // Serialize the state
        const hasGroups = state.group && state.group.length;
        return this.http.get(`${environment.apiUrl}${path}?${queryStr}`)
            .pipe(
                map((result: any) => (<GridDataResult>{
                    data: hasGroups ? translateDataSourceResultGroups(result.Data) : result.Data,
                    total: result.Total,
                }))
            );

    }

    get(path: string): Observable<any> {
        return this.http.get(`${environment.apiUrl}${path}`)
            .pipe(catchError(this.handleError('GET LIST')));
    }

    delete(path: string): Observable<any> {
        return this.http.delete(`${environment.apiUrl}${path}`)
            .pipe(catchError(this.handleError('DELETE OBJ')));
    }

    postJson(path: string, body: any): Observable<any> {
        return this.http.post(
            `${environment.apiUrl}${path}`,
            JSON.stringify(body), httpOptionsJson
        ).pipe(catchError(this.handleError('POST OBJ')));
    }

    putJson(path: string, body: any): Observable<any> {
        return this.http.put(
            `${environment.apiUrl}${path}`,
            JSON.stringify(body), httpOptionsJson
        ).pipe(catchError(this.handleError('PUT OBJ')));
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            this.messageService.add(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    private log(message: string) {
        this.messageService.add(`API service: ${message}`);
    }
}

