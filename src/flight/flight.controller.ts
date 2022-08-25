import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PassengerService } from 'src/passenger/passenger.service';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';

@ApiTags('flight')
@ApiBearerAuth() // para protejer rutas 
@UseGuards(JwtAuthGuard)
@Controller('api/v1/flight')
export class FlightController {
    constructor(
        private readonly _flightService: FlightService,
        private readonly _passengerService: PassengerService
    ){}

    @Post()
    create (@Body() flightDTO: FlightDTO){
        return this._flightService.create(flightDTO);
    }
    @Get()
    findAll(){
        return this._flightService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string){
        return this._flightService.findById(id);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() flightDTO: FlightDTO){
        return  this._flightService.update(id, flightDTO)
    }
    @Delete(':id')
    delete(@Param('id') id: string){
        return this._flightService.delete(id);
    }
    @Post(':flightId/passenger/:passengerId')
    async addPassenger(@Param('flightId') flightId: string, @Param('passengerId') passengerId: string ){
        const passenger = await this._passengerService.finOne(passengerId);
        if (!passenger) {
            throw new HttpException("passenger not found", HttpStatus.NOT_FOUND);
        };
        return this._flightService.addPassenger(flightId, passengerId);
    }

}
