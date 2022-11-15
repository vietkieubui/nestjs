import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto, LoginUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.createUser(registerUserDto);
    const token = await this._createToken(user);
    return {
      email: user.email,
      ...token,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.findByLogin(loginUserDto);
    const token = await this._createToken(user);

    return {
      email: user.email,
      ...token,
    };
  }

  async validateUser(email) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async createUser(registerUserDto: RegisterUserDto) {
    registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10);

    // check exists
    const userInDb = await this.authRepository.findByCondition({
      email: registerUserDto.email,
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return await this.authRepository.create(registerUserDto);
  }

  async findByLogin({ email, password }: LoginUserDto) {
    const user = await this.authRepository.findByCondition({
      email: email,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const is_equal = bcrypt.compareSync(password, user.password);

    if (!is_equal) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
  async findByEmail(email) {
    return await this.authRepository.findByCondition({
      email: email,
    });
  }

  private async _createToken({ email }, refresh = true) {
    const accessToken = this.jwtService.sign({ email });
    if (refresh) {
      const refreshToken = this.jwtService.sign(
        { email },
        {
          secret: process.env.SECRETKEY_REFRESH,
          expiresIn: process.env.EXPIRESIN_REFRESH,
        },
      );
      await this.update(
        { email: email },
        {
          refreshToken: refreshToken,
        },
      );
      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
        refreshToken,
        expiresInRefresh: process.env.EXPIRESIN_REFRESH,
      };
    } else {
      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
      };
    }
  }

  async refresh(refresh_token) {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.SECRETKEY_REFRESH,
      });
      const user = await this.getUserByRefresh(refresh_token, payload.email);
      const token = await this._createToken(user, false);
      return {
        email: user.email,
        ...token,
      };
    } catch (e) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async logout(user: User) {
    await this.update({ email: user.email }, { refreshToken: null });
  }

  async getUserByRefresh(refresh_token, email) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const is_equal = await bcrypt.compare(
      this.reverse(refresh_token),
      user.refreshToken,
    );

    if (!is_equal) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async update(filter, update) {
    if (update.refreshToken) {
      update.refreshToken = await bcrypt.hash(
        this.reverse(update.refreshToken),
        10,
      );
    }
    return await this.authRepository.findByConditionAndUpdate(filter, update);
  }

  private reverse(s) {
    return s.split('').reverse().join('');
  }
}
