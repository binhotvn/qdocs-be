import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { sha512 } from 'js-sha512';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import * as NodeRSA from 'node-rsa';

const KEY_DIR = `${process.cwd()}/private_key`;

export function getPrivateKey(): string {
  const privateKey = NodeRSA(fs.readFileSync(`${KEY_DIR}/key_for_jwt`));
  return privateKey.exportKey('private');
}

export function getPublicKey(): string {
  const privateKey = NodeRSA(fs.readFileSync(`${KEY_DIR}/key_for_jwt`));
  return privateKey.exportKey('public');
}

export const PRIVATE_KEY = () => {
  const PRIVATE_KEY_FUNCTION = NodeRSA(
    fs.readFileSync(`${KEY_DIR}/key_for_jwt`),
  );
  return PRIVATE_KEY_FUNCTION.exportKey('private');
};
export const PUBLIC_KEY = () => {
  const PRIVATE_KEY_FUNCTION = NodeRSA(
    fs.readFileSync(`${KEY_DIR}/key_for_jwt`),
  );
  return PRIVATE_KEY_FUNCTION.exportKey('public');
};
export const UNSAFE_ENTITIES_USER = ['token', 'password'];

@Injectable()
export class UtilsService {
  randomToken(length = 10) {
    const randomUUID = uuidv4();
    return sha512(
      sha512(randomUUID + randomUUID + randomUUID).substring(0, length * 3),
    ).substring(0, 10);
  }

  async returnSafeUser(user: User): Promise<User> {
    UNSAFE_ENTITIES_USER.forEach((entities) => {
      user[entities] = undefined;
      delete user[entities];
    });
    return user;
  }
}
