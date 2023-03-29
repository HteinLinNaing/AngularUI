import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Supplier } from '../models/supplier';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root'
})
export class SupplierService {

    private supplierUrl = 'http://localhost:3600/api/Supplier';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
    ) { }

    getSuppliers(): Observable<Supplier[]> {
        return this.http.get<Supplier[]>(this.supplierUrl)
            .pipe(
                tap(_ => this.log('fetched suppliers')),
                catchError(this.handleError<Supplier[]>('getSuppliers', []))
            );
    }

    getSupplier(id: number): Observable<Supplier> {
        const url = `${this.supplierUrl}/${id}`;
        return this.http.get<Supplier>(url)
            .pipe(
                tap(_ => this.log(`fetched supplier id=${id}`)),
                catchError(this.handleError<Supplier>(`get supplier id=${id}`))
            );
    }

    // ? PUT: update the supplier on the server
    updateSupplier(supplier: Supplier): Observable<any> {
        const url = `${this.supplierUrl}/${supplier.Id}`;
        return this.http.put(url, supplier, this.httpOptions).pipe(
            tap(_ => this.log(`updated supplier id = ${supplier.Id}`)),
            catchError(this.handleError<any>('updateSupplier'))
        );
    }

    /** POST: add a new supplier to the server */
    addSupplier(supplier: Supplier): Observable<Supplier> {
        return this.http.post<Supplier>(this.supplierUrl, supplier, this.httpOptions).pipe(
            tap((newSupplier: Supplier) => this.log(`added supplier w/ id=${newSupplier.Id}`)),
            catchError(this.handleError<Supplier>('addSupplier'))
        );
    }

    /** DELETE: delete the supplier from the server */
    deleteSupplier(id: number): Observable<Supplier> {
        const url = `${this.supplierUrl}/${id}`;

        return this.http.delete<Supplier>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted supplier id=${id}`)),
            catchError(this.handleError<Supplier>('deleteSupplier'))
        );
    }

    // TODO: For Message Services
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`SupplierService: ${message}`);
    }
}
