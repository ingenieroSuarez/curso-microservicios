import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('api/v1/user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}
    @Post()
    @ApiOperation({summary: 'Create users'})
    create(@Body() userdto: UserDto){
        return this.userService.create(userdto);
    }
    @Get()
    findAll(){
        return this.userService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.userService.findOne(id)
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() userDto: UserDto ){
        console.log("actualizando");
        
        return this.userService.update(id, userDto);
    }
    @Delete(':id')
    delete(@Param(':id') id: string){
        return this.userService.delete(id)
    }
}
