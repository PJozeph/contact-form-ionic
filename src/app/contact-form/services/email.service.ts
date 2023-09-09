import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormRequestInterface } from '../types/form-request.interface';

@Injectable({
    providedIn: 'root',
})
export class EmailService {
    constructor(private http: HttpClient) {}

    sendEmail(formRequest: FormRequestInterface): Observable<any> {
        return this.http.post('https://contact-form-service-bvfckqryxa-uc.a.run.app/email', formRequest);
    }
}
