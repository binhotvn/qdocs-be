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
  removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ê|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
    str = str.replace(/\u02C6|\u0306|\u031B/g, '');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư

    str = str.replace(/ + /g, ' ');
    str = str.trim();
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      ' ',
    );
    return str;
  }
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
