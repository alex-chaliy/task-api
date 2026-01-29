import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(JwtGuard)
  async getUser(@Context() context: any): Promise<User> {
    return context.req.user;
  }

  @Query(() => User)
  async getUserById(@Args('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }
}
