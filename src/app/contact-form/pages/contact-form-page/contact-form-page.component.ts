import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
export class ContactFormPageComponent {

    public currentMentoringType: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private store: Store,
        private dialogConfirm: DialogConfirmService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    public data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        onConfirm: this.dialogConfirm.onConfirmAction$.pipe(
            filter(Boolean),
            tap(() => this.clearForm())
        ),
        paramHandling : this.activatedRoute.queryParamMap.pipe(
            tap((params) => {
                const mentoringType = params.get('mentoringType');
                this.currentMentoringType = mentoringType || '';
                if (mentoringType) {
                    this.form.patchValue({ subject: mentoringType });
                }
            })
        )
    });

    public form = this.formBuilder.nonNullable.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]],
        phoneNumber: ['', [Validators.pattern(/^\+?[0-9]{10,}$/)]],
        subject: ['', [Validators.required]],
        message: [''],
    });



    public handleChange(event: any) {
        this.router.navigate([], { queryParams: { mentoringType: event.detail.value }, queryParamsHandling: 'merge' });
    }

    public onSubmit() {
        const request: FormRequestInterface = this.form.getRawValue();
        this.store.dispatch(contactFromAction.sendForm({ request }));
    }

    public clearForm() {
        this.form.reset();
    }
}
