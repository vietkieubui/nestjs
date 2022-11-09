import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { Auth } from '../schemas/auth.schema';

@Injectable()
export class AuthRepository extends BaseRepository<Auth> {
  constructor(
    @InjectModel('User')
    private readonly authModel: Model<Auth>,
  ) {
    super(authModel);
  }
}
