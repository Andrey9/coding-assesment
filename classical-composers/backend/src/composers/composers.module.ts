import { Module } from '@nestjs/common';
import { ComposersController } from './composers.controller';
import { ComposersService } from './composers.service';

@Module({
  controllers: [ComposersController],
  providers: [ComposersService]
})
export class ComposersModule {}
