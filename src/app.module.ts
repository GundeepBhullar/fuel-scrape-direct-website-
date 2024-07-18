import { Module } from '@nestjs/common';
import { FuelModule } from './fuel/fuel.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true}), FuelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
