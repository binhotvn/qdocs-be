import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { sha512 } from 'js-sha512';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
const NodeRSA = require('node-rsa');
const KEY_DIR = `${process.cwd()}/privateKey/`;

/**
    Day chi la cac intialize cac default 
    khong can thiet nhung cu giu vi co truong hop server khong doc duoc file gay crash ;)))))
*/
export let PRIVATE_KEY = '34a2c281-71f6-4d2a-84c1-a9df09ac8dbc';
export let PUBLIC_KEY = '541b16c2-4646-4471-a126-f91b10bd756b';
export const PUBLIC_KEY_FUNCTION = NodeRSA(
  fs.readFileSync(KEY_DIR + 'key.pub'),
);
export const PRIVATE_KEY_FUNCTION = NodeRSA(fs.readFileSync(KEY_DIR + 'key'));
PRIVATE_KEY = PRIVATE_KEY_FUNCTION.exportKey('private');
PUBLIC_KEY = PUBLIC_KEY_FUNCTION.exportKey('public');
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
