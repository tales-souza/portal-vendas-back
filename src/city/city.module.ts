import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './interfaces/city.entity';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
  imports: [TypeOrmModule.forFeature([CityEntity]), CacheModule.register()],
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule { }
