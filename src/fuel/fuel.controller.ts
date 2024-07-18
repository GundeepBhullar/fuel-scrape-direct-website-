import { Controller, Get, Query } from '@nestjs/common';
import { FuelService } from './fuel.service';

@Controller('fuel')
export class FuelController {
  constructor(private readonly fuelService: FuelService) {}
 
  @Get('petrol')
  getProducts() {
    return this.fuelService.getFuelPrice();
  }


}
