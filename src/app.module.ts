import { Module } from '@nestjs/common';
import { FuelModule } from './fuel/fuel.module';

@Module({
  imports: [FuelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
