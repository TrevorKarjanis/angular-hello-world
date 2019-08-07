import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, map, share, takeUntil } from 'rxjs/operators';

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
            map(data => data as R),
            finalize(() => delete this.requests[id]),
            share()
        );
    }
}
