export type IssuerId =
  | 'issuer_one'
  | 'issuer_two'
  | 'issuer_three'
  | 'issuer_four'
  | 'issuer_five';

export const ALL_ISSUERS: IssuerId[] = [
  'issuer_one',
  'issuer_two',
  'issuer_three',
  'issuer_four',
  'issuer_five',
];

export interface ApplicantProfile {
  fullName: string;
  email: string;
  dateOfBirth: string;
  ssnLast4: string;
  annualIncome: number;
  monthlyHousingPayment: number;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  creditBuilderGoal: 'starter_credit' | 'utilization_optimization' | 'on_time_history';
}

export interface SignedApplicationPayload {
  requestId: string;
  memberId: string;
  timestamp: number;
  nonce: string;
  issuers: IssuerId[];
  applicant: ApplicantProfile;
}

export type ApplicationStatus =
  | 'QUEUED'
  | 'SUBMITTED'
  | 'PENDING_REVIEW'
  | 'APPROVED'
  | 'DECLINED'
  | 'FAILED';

export interface IssuerApplicationRecord {
  applicationId: string;
  requestId: string;
  memberId: string;
  issuerId: IssuerId;
  status: ApplicationStatus;
  externalRefId?: string;
  creditLimit?: number;
  reportedToBureaus: boolean;
  utilizationTargetPct: number;
  autoPayEnabled: boolean;
  updatedAt: string;
  error?: string;
}

export interface IssuerWebhookEvent {
  eventId: string;
  issuerId: IssuerId;
  externalRefId: string;
  applicationId: string;
  status: ApplicationStatus;
  creditLimit?: number;
  statementBalance?: number;
  paymentOnTime?: boolean;
  occurredAt: string;
}
