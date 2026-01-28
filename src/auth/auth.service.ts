import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignUpInput, SignInInput, AuthResponse } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpInput: SignUpInput): Promise<AuthResponse> {
    const user = await this.usersService.create(
      signUpInput.email,
      signUpInput.password,
      signUpInput.firstName,
      signUpInput.lastName,
    );

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken,
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  async signIn(signInInput: SignInInput): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(signInInput.email);

    const isPasswordValid = await this.usersService.validatePassword(
      signInInput.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken,
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
