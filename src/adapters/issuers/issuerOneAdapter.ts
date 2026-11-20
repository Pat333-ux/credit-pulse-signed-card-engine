import { BaseIssuerAdapter, IssuerSubmissionResponse } from '../baseIssuerAdapter';
import { IssuerId } from '../../types/domain';

export class IssuerOneAdapter extends BaseIssuerAdapter {
  readonly issuerId: IssuerId = 'issuer_one';
  readonly displayName = 'Issuer One Credit Card';

  protected async sendToIssuerEndpoint(
    applicationId: string,
    mappedPayload: Record<string, unknown>
  ): Promise<IssuerSubmissionResponse> {
    void mappedPayload;
    return {
      status: 'APPROVED',
      externalRefId: `I1-${applicationId.slice(0, 8)}`,
      creditLimit: 2500,
    };
  }
}
