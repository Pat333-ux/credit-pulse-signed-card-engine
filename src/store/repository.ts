import {
  ApplicantProfile,
  IssuerApplicationRecord,
  IssuerId,
} from '../types/domain';
import { generateMemberKeyPair } from '../crypto/keys';

interface MemberRecord {
  memberId: string;
  publicKeyPem: string;
  usedNonces: Set<string>;
  profile?: ApplicantProfile;
}

class InMemoryRepository {
  private members = new Map<string, MemberRecord>();
  private applications = new Map<string, IssuerApplicationRecord>();

  registerMember(memberId: string, publicKeyPem?: string): MemberRecord {
    const existing = this.members.get(memberId);
    if (existing) return existing;

    const generated = generateMemberKeyPair();
    const record: MemberRecord = {
      memberId,
      publicKeyPem: publicKeyPem ?? generated.publicKeyPem,
      usedNonces: new Set<string>(),
    };
    this.members.set(memberId, record);
    return record;
  }

  getMember(memberId: string): MemberRecord | undefined {
    return this.members.get(memberId);
  }

  consumeNonce(memberId: string, nonce: string): boolean {
    const member = this.members.get(memberId);
    if (!member) return false;
    if (member.usedNonces.has(nonce)) return false;
    member.usedNonces.add(nonce);
    return true;
  }

  saveMemberProfile(memberId: string, profile: ApplicantProfile): void {
    const member = this.members.get(memberId);
    if (member) {
      member.profile = profile;
    }
  }

  upsertApplication(record: IssuerApplicationRecord): IssuerApplicationRecord {
    this.applications.set(record.applicationId, record);
    return record;
  }

  getApplication(applicationId: string): IssuerApplicationRecord | undefined {
    return this.applications.get(applicationId);
  }

  listApplicationsByMember(memberId: string): IssuerApplicationRecord[] {
    return Array.from(this.applications.values()).filter(
      (app) => app.memberId === memberId
    );
  }

  listApprovedForCreditBuilding(issuerId?: IssuerId): IssuerApplicationRecord[] {
    return Array.from(this.applications.values()).filter(
      (app) =>
        app.status === 'APPROVED' && (!issuerId || app.issuerId === issuerId)
    );
  }
}

export const repository = new InMemoryRepository();
