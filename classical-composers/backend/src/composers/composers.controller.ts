import { Controller, Get, Param } from '@nestjs/common';
import { ComposersService } from './composers.service';

@Controller('composers')
export class ComposersController {
  constructor(private readonly composersService: ComposersService) {}

  @Get('/')
  getComposers() {
    return this.composersService.getComposers();
  }

  @Get('/:id')
  getComposer(@Param('id') id: string) {
    return this.composersService.getComposer(+id);
  }

  @Get('/:id/contact')
  getComposerContact(@Param('id') id: string) {
    return this.composersService.getComposerContact(+id);
  }
}
