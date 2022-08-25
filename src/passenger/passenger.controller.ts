import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from "./passenger.service";

@ApiTags('passenger')
@Controller('api/v1/passenger')
export class PassengerController {
    constructor(
        private readonly _passengerService: PassengerService
    ){}
    @Post()
    create(@Body() passengerDTO: PassengerDTO ){
        return this._passengerService.create(passengerDTO)
    }
    @Get()
    findAll(){
        return this._passengerService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: string){
        return this._passengerService.finOne(id)
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() passengerDTO: PassengerDTO){
        return this._passengerService.update(id, passengerDTO)
    }
    @Delete(':id')
    delete(@Param('id') id: string){
        return this._passengerService.delete(id)
    }
}
