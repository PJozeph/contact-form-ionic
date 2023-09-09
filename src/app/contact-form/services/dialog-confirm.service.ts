import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DialogConfirmService {
    private confirmAction = new BehaviorSubject<Boolean>(true);

    constructor() {}

    public confirm(value: Boolean): void {
        this.confirmAction.next(value);
    }

    public get onConfirmAction$(): Observable<Boolean> {
        return this.confirmAction.asObservable();
    }
}
