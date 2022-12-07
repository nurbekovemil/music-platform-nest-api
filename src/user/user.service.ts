import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreateDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async createUser(dto: UserCreateDto) {
    const user = await this.userModel.create({
      ...dto,
    });
    return user;
  }
  async activateUser(activationLink) {
    const user = await this.userModel.findOne({ activationLink });
    if (!user) {
      throw new HttpException(
        'Invalid activation link',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.isActivated = true;
    await user.save();
    return {
      url: 'http://localhost:3000',
    };
  }
}
