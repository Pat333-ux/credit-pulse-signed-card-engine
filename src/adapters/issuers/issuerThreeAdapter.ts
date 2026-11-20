import { BaseIssuerAdapter, IssuerSubmissionResponse } from '../baseIssuerAdapter';
import { IssuerId } from '../../types/domain';

export class IssuerThreeAdapter extends BaseIssuerAdapter {
  readonly issuerId: IssuerId = 'issuer_three';
  readonly displayName = 'Issuer Three Secured & Unsecured';

  protected async sendToIssuerEndpoint(
    applicationId: string,
    mappedPayload: Record<string, unknown>
  ): Promise<IssuerSubmissionResponse> {
    void mappedPayload;
    return {
      status: 'APPROVED',
      externalRefId: `I3-${applicationId.slice(0, 8)}`,
      creditLimit: 2000,
    };
  }
}
