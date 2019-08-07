import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap, map, share } from 'rxjs/operators';

@Injectable()
export class MessageService implements OnDestroy {
    private destroy$: Subject<null>;
    private requests: { [id: string]: Observable<any> } = {};

    constructor(private http: HttpClient) { }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    get<R>(id: string): Observable<R> {
        if (this.requests[id]) return this.requests[id];
        return this.requests[id] = this.http.get(`resources/${id}`).pipe(
            takeUntil(this.destroy$),
            tap(_ => delete this.requests[id]),
            map(data => data as R),
            share()
        )
    }
}
