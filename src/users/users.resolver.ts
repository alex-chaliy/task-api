import { Resolver, Query, Field, ObjectType } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async getUser(id: string): Promise<User> {
    return this.usersService.findById(id);
  }
}
