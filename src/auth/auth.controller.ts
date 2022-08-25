import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {
    constructor(
        private readonly _authService: AuthService
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signin(@Req() req ){
        console.log(req.user);
        return this._authService.signIn(req.user)
    }

    @Post('signup')
    async signup(@Body() userDto: UserDto ){
        return this._authService.signUp(userDto);
    }


}
