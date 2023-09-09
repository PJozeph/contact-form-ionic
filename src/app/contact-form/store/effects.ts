import { inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { DialogConfirmService } from '../services/dialog-confirm.service';
import { EmailService } from '../services/email.service';
import { contactFromAction } from './actions';

export const sendEmailEffect = createEffect(
    (actions$ = inject(Actions), emailService = inject(EmailService)) => {
        return actions$.pipe(
            ofType(contactFromAction.sendForm),
            switchMap(({ request }) => {
                return emailService.sendEmail(request).pipe(
                    map(() => contactFromAction.formSentSuccess()),
                    catchError(() => of(contactFromAction.formSentFailure()))
                );
            })
        );
    },
    { functional: true }
);

export const emailSentSuccess = createEffect(
    (actions$ = inject(Actions), alertController = inject(AlertController), dialogConfirm = inject(DialogConfirmService)) => {
        return actions$.pipe(
            ofType(contactFromAction.formSentSuccess),
            tap(() => {
                const alertButtons = [
                    {
                        text: 'OK',
                        handler: () => {
                            dialogConfirm.confirm(true);
                        },
                    },
                ];
                const alert = alertController.create({
                    header: 'Success',
                    message: 'Your message has been sent',
                    buttons: alertButtons,
                });
                alert.then(alert => alert.present());
            })
        );
    },
    { functional: true, dispatch: false }
);
