export interface GmailsRecuperacionState {
  email1: string;
  email2: string;
  email3: string;
}

export interface GmailsRecuperacionErrors {
  email1?: string;
  email2?: string;
  email3?: string;
}

export interface SaveGmailsPayload {
  emails: string[];
}