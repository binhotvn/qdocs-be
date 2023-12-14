import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';

const privateKeyPath = './private_key/key_for_jwt';

function generateRSAKey() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, // You can adjust the key size as needed
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });

  return { privateKey, publicKey };
}
export const setup = () => {
  if (fs.existsSync(privateKeyPath)) {
    console.log(`Private key exists at ${privateKeyPath}`);
  } else {
    console.log(`Private key does not exist. Generating...`);
    const { privateKey } = generateRSAKey();

    fs.mkdirSync(path.dirname(privateKeyPath), { recursive: true });
    fs.writeFileSync(privateKeyPath, privateKey, 'utf-8');

    console.log(`Private key generated and saved to ${privateKeyPath}`);
  }
};
setup();
