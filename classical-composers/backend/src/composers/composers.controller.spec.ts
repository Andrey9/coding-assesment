import { Test, TestingModule } from '@nestjs/testing';
import { ComposersController } from './composers.controller';

describe('ComposersController', () => {
  let controller: ComposersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComposersController],
    }).compile();

    controller = module.get<ComposersController>(ComposersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
