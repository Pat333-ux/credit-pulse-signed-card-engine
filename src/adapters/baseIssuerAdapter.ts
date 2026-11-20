import {
  ApplicantProfile,
  ApplicationStatus,
  IssuerId,
} from '../types/domain';

export interface IssuerSubmissionResponse {
  status: ApplicationStatus;
  externalRefId: string;
  creditLimit?: number;
}

export interface IIssuerAdapter {
  readonly issuerId: IssuerId;
  readonly displayName: string;
  submitPrefilledApplication(
    applicationId: string,
    applicant: ApplicantProfile
  ): Promise<IssuerSubmissionResponse>;
  enrollCreditBuilderProgram(externalRefId: string): Promise<{
    enrolled: boolean;
    bureauReportingActive: boolean;
  }>;
}

export abstract class BaseIssuerAdapter implements IIssuerAdapter {
  abstract readonly issuerId: IssuerId;
  abstract readonly displayName: string;

  protected mapApplicantToIssuerSchema(applicant: ApplicantProfile) {
    return {
      full_name: applicant.fullName,
      email_address: applicant.email,
      dob: applicant.dateOfBirth,
      ssn_last_4: applicant.ssnLast4,
      annual_income_usd: applicant.annualIncome,
      monthly_housing_usd: applicant.monthlyHousingPayment,
      address: {
        line1: applicant.streetAddress,
        city: applicant.city,
        region: applicant.state,
        postal_code: applicant.postalCode,
      },
      credit_builder_mode: applicant.creditBuilderGoal,
    };
  }

  async submitPrefilledApplication(
    applicationId: string,
    applicant: ApplicantProfile
  ): Promise<IssuerSubmissionResponse> {
    const mapped = this.mapApplicantToIssuerSchema(applicant);
    return this.sendToIssuerEndpoint(applicationId, mapped);
  }

  protected abstract sendToIssuerEndpoint(
    applicationId: string,
    mappedPayload: Record<string, unknown>
  ): Promise<IssuerSubmissionResponse>;

  async enrollCreditBuilderProgram(externalRefId: string) {
    return {
      enrolled: true,
      bureauReportingActive: Boolean(externalRefId),
    };
  }
}
