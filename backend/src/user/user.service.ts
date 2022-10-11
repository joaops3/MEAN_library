import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './userDto/create-user.dto';
import { UpdateUserDto } from './userDto/update-user.dto';
import * as bcrypt from "bcrypt"
import {v4} from "uuid"

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.email) {
      throw new HttpException('nome obrigatorio', 422);
    }
    if (!createUserDto.email) {
      throw new HttpException('password obrigatorio', 422);
    }
   
    const createdUser = new this.userModel(createUserDto);
    let salt =  await bcrypt.genSalt(12)
    let hash = await  bcrypt.hash(createdUser.password, salt )
    
    createdUser.password = hash
    createdUser._id = v4()
    await createdUser.save();
    return createdUser;
   
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async findOneByEmail(email: string): Promise<User>{
    const user = await this.userModel.findOne({email });
    if(!user){
      throw new HttpException("error user not found", 404)
    }
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!updateUserDto.email) {
      throw new HttpException('nome obrigatorio', 422);
    }
    let user = await this.userModel.findById(id);
    if (!user) {
      return ;
    }
    user.email = updateUserDto.email
    await user.save()
    return user;
  }

  async delete(id: string){
    return this.userModel.findByIdAndDelete(id)
  }

  async comparePassword(password: string, userPassword: string){
  try{
    const validation = await  bcrypt.compare(password, userPassword )
    return validation
  }catch(e){
    console.log(e)
  }
  
  }
}
