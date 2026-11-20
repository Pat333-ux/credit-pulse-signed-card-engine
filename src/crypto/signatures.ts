import crypto from 'crypto';
import { SignedApplicationPayload } from '../types/domain';

export function canonicalizePayload(payload: SignedApplicationPayload): string {
  return JSON.stringify(payload, Object.keys(payload).sort());
}

export function signPayloadWithPrivateKey(
  payload: SignedApplicationPayload,
  privateKeyPem: string
): string {
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(canonicalizePayload(payload));
  signer.end();
  return signer.sign(privateKeyPem, 'base64');
}

export function verifyMemberSignature(
  payload: SignedApplicationPayload,
  signatureBase64: string,
  publicKeyPem: string
): boolean {
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(canonicalizePayload(payload));
  verifier.end();
  return verifier.verify(publicKeyPem, signatureBase64, 'base64');
}

export function computeHmacSha256(rawBody: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
}

export function verifyHmacSha256(
  rawBody: string,
  signatureHex: string,
  secret: string
): boolean {
  const expected = computeHmacSha256(rawBody, secret);
  const a = Buffer.from(signatureHex, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
