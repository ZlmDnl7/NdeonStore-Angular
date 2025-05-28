import { Test, TestingModule } from '@nestjs/testing';
import { DetalleComprasService } from './detalle-compras.service';

describe('DetalleComprasService', () => {
  let service: DetalleComprasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleComprasService],
    }).compile();

    service = module.get<DetalleComprasService>(DetalleComprasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
