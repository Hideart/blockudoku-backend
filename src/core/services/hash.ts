import crypto from 'crypto';

function sha256(password: string, salt: string): string {
  const hash = crypto.createHmac('sha256', salt);

  hash.update(password);

  return hash.digest('hex');
}

export { sha256 };
