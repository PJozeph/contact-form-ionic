export interface ContactFormStateInterface {
    isSubmitting: boolean;
    validationErrors: string | null;
    emailIsSent: boolean | undefined;
    emailSentSuccess: boolean | undefined;
}
