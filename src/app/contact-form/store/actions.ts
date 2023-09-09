import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FormRequestInterface } from '../types/form-request.interface';

export const contactFromAction = createActionGroup({
    source: 'contact-form',
    events: {
        SendForm: props<{ request: FormRequestInterface }>(),
        'Form sent success': emptyProps(),
        'Form sent failure': emptyProps(),
        
    },
});
