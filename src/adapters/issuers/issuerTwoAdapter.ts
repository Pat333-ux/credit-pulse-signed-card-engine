import { BaseIssuerAdapter, IssuerSubmissionResponse } from '../baseIssuerAdapter';
import { IssuerId } from '../../types/domain';

export class IssuerTwoAdapter extends BaseIssuerAdapter {
  readonly issuerId: IssuerId = 'issuer_two';
  readonly displayName = 'Issuer Two Rewards & Builder';

  protected async sendToIssuerEndpoint(
    applicationId: string,
    mappedPayload: Record<string, unknown>
  ): Promise<IssuerSubmissionResponse> {
    void mappedPayload;
    return {
      status: 'PENDING_REVIEW',
      externalRefId: `I2-${applicationId.slice(0, 8)}`,
      creditLimit: 3000,
    };
  }
}
