import { createFeature, createReducer, on } from '@ngrx/store';
import { ContactFormStateInterface } from '../types/form-state.interface';
import { contactFromAction } from './actions';

const initialState: ContactFormStateInterface = {
    isSubmitting: false,
    validationErrors: null,
    emailIsSent: undefined,
    emailSentSuccess: undefined,
};

const contactFormFeature = createFeature({
    name: 'contactForm',
    reducer: createReducer(
        initialState,
        on(contactFromAction.sendForm, state => ({ ...state, isSubmitting: true, emailIsSent: true })),
        on(contactFromAction.formSentSuccess, state => ({ ...state, isSubmitting: false, emailIsSent: true, emailSentSuccess: true })),
        on(contactFromAction.formSentFailure, state => ({ ...state, isSubmitting: false, emailIsSent: false, emailSentSuccess: false }))
    ),
});

export const {
    name: contactFormFeatureKey,
    reducer: contactFormReducer,
    selectIsSubmitting,
    selectEmailIsSent,
    selectEmailSentSuccess,
} = contactFormFeature;
