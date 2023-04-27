import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

const cookieExtractor = (req) => {
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
    const refreshTokenCookie = cookies.find(cookie => cookie.startsWith('refreshToken='));
    if (refreshTokenCookie) {
      const refreshToken = refreshTokenCookie.split('=')[1];
      return refreshToken;
    }
  }
  return null;
};

export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: `${process.env.jwt_secret}`,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, username: payload.username, token_version: payload.token_version };
  }
};