import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartEntity } from './interfaces/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProductModule } from 'src/cart-product/cart-product.module';


@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), CartProductModule],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule { }
