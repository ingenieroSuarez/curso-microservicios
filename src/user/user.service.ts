import { HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt'
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(USER.name) private readonly model:Model<IUser>
    ){}
    async hashPassword(password: string ): Promise<string>{
        console.log("encriptando", password);
        const salt= await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt)
    }
    async create(userDto: UserDto):Promise<IUser>{
        const passwordEncrypted = await this.hashPassword(userDto.password);
        const newUser= new this.model({
            ...userDto,
            password: passwordEncrypted
        });
        return await newUser.save();
    };
    async findAll(): Promise<IUser[]>{
        return await this.model.find();
    }
    async findOne(id: string): Promise<IUser>{
        console.log("buscando id", id);
        return await this.model.findById(id)
    }
    async update(id: string, userDto: UserDto): Promise<IUser>{
        console.log("actualizando id: ", id);
        const passwordEncrypted = await this.hashPassword(userDto.password);
        const user= {...userDto, password: passwordEncrypted};
        return await this.model.findByIdAndUpdate(id, user, {new: true})
    }
    async delete(id: string){
        await this.model.findByIdAndDelete(id);
        return {status: HttpStatus.OK, msg: "Deleted"}
    }
}
