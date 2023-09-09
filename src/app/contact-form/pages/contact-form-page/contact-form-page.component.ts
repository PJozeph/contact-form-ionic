import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { combineLatest, filter, tap } from 'rxjs';
import { DialogConfirmService } from '../../services/dialog-confirm.service';
import { contactFromAction } from '../../store/actions';
import { selectIsSubmitting } from '../../store/reducer';
import { FormRequestInterface } from '../../types/form-request.interface';

@Component({
    selector: 'app-contact-form-page',
    templateUrl: './contact-form-page.component.html',
    styleUrls: ['./contact-form-page.component.scss'],
    standalone: true,
    imports: [IonicModule, ReactiveFormsModule, CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormPageComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private store: Store, private dialogConfirm: DialogConfirmService) {}

    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        onConfirm: this.dialogConfirm.onConfirmAction$.pipe(
            filter(Boolean),
            tap(() => this.clearForm())
        ),
    });

    ngOnInit() {}
    public form = this.formBuilder.nonNullable.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]],
        phoneNumber: ['', [Validators.pattern(/^\+?[0-9]{10,}$/)]],
        message: ['', Validators.required],
        subject: ['Lets work together', Validators.required],
    });

    public onSubmit() {
        const request: FormRequestInterface = this.form.getRawValue();
        this.store.dispatch(contactFromAction.sendForm({ request }));
    }

    public clearForm() {
        this.form.reset();
    }

    public subjectSelect(selectedSubject: any) {
        const subject = selectedSubject.detail.value;
        this.form.patchValue({ subject });
    }
}
