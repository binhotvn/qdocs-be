import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sha512 } from 'js-sha512';

import { UsersService } from 'src/users/users.service';
import { UtilsService } from 'src/utils/utils.service';
/**
 * EXTRA_PASSWORD_STRING la gia tri bien khien mat khau co them extra string cho du lo database
 * cung khong the decrypt ra origin password
 */
export const PRIVATE_ADDON_PASSWORD = process.env.EXTRA_PASSWORD_STRING;
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly UserService: UsersService,
    private readonly utils: UtilsService,
  ) {}
  async vaildLogin(eop: string, password: string) {
    let user = await this.UserService.getByEOP(eop);
    let message;
    if (user && user.password === sha512(password + PRIVATE_ADDON_PASSWORD)) {
      /**
       * When new token created it will be update to database and revoke old token
       */
      const newToken = this.utils.randomToken();
      await this.UserService.updateUserToken(user._id, newToken);

      /**
        Fetch new data from database to make sure it's updated
      */
      user = await this.UserService.getById(user._id);

      const { ...result } = user;

      result['_doc'].token = newToken;

      return { data: result['_doc'], message: 'LOGIN_SUCCESS' };
    } else {
      message = 'LOGIN_FAILED_INVALID_CREDENTIALS';
    }

    return { data: null, message: message };
  }
  getUserFromToken(token: string) {
    return this.UserService.getUserFromToken(token);
  }
  async login(user: any) {
    const payload_user = user;
    const payload = {
      id: payload_user._id,
      token: payload_user.token,
    };
    return {
      statusCode: 200,
      message: 'LOGIN_SUCCESS',
      data: {
        access_token: this.jwtService.sign(payload),
      },
    };
  }
}
