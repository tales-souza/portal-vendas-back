import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { ProductEntity } from '../interfaces/product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../__mocks__/product.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, {
        provide: getRepositoryToken(ProductEntity),
        useValue: {
          find: jest.fn().mockResolvedValue([productMock]),
        }
      }],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity)
    )


  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productRepository).toBeDefined;
  });

  it('should return all products', async () => {
    const products = await service.findAllProducts();
    expect(products).toEqual([productMock]);
  });

  it('should return error if exception (bd)', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());
    await expect(service.findAllProducts()).rejects.toThrowError();
  });

  it('should return error if products return null or empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue(undefined);
    await expect(service.findAllProducts()).rejects.toThrowError();
  })

});
