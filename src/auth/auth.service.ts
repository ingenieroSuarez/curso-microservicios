import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly _userService: UserService,
        private readonly _jwtService: JwtService
    ){}
    async validateUser(username: string, password: string):Promise<any>{
        const user= await this._userService.findByUsername(username);
        const isValidPassword= await this._userService.checkPassword( password, user.password);
        if(user && isValidPassword) return user;
        return null;
    }
    async signIn(user: any){ //generar un payload
        const payload = {
            username: user.username,
            sub: user._id
        }
        return { acces_token: this._jwtService.sign(payload)}
    }

    async signUp(userDTO: UserDto){
        return this._userService.create(userDTO);

    }
}
