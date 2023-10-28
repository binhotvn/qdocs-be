import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';
import { PUBLIC_KEY } from 'src/utils/utils.service';
import { AuthService } from '../auth.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly UserServices: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: PUBLIC_KEY,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    if (payload.token === undefined) {
      throw new UnauthorizedException('TOKEN_NOT_FOUND');
    }
    const value = await this.cacheManager.get(payload.token);
    if (value == null) {
      const user = await this.UserServices.getUserFromToken(payload.token);
      if (user == null) {
        throw new UnauthorizedException('TOKEN_EXPIRED');
      }
      if (payload.id === user._id) {
        this.cacheManager.set(payload.token, user);
        return {
          id: payload.id,
          token: payload.token,
          name: payload.name,
        };
      } else {
        throw new UnauthorizedException('TOKEN_INVALID');
      }
    }

    return {
      id: payload.id,
      token: payload.token,
      name: payload.name,
    };
  }
}
