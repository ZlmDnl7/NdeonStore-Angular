import { Test, TestingModule } from '@nestjs/testing';
import { DetalleComprasController } from './detalle-compras.controller';

describe('DetalleComprasController', () => {
  let controller: DetalleComprasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleComprasController],
    }).compile();

    controller = module.get<DetalleComprasController>(DetalleComprasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
