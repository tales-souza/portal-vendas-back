import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../interfaces/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryMockEntity } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/createCategory.mock';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, {
        provide: getRepositoryToken(CategoryEntity),
        useValue: {
          find: jest.fn().mockResolvedValue([categoryMockEntity]),
          save: jest.fn().mockResolvedValue(categoryMockEntity),
          findOne: jest.fn().mockResolvedValue(categoryMockEntity)
        }
      }],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity)
    )
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });


  it('should return all categories', async () => {
    const categories = await service.findAllCategories();
    expect(categories).toEqual([categoryMockEntity]);
  });

  it('should return error if categories return null or empty', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);
    await expect(service.findAllCategories()).rejects.toThrowError();
  });

  it('should return error if exception (BD)', async () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error())
    await expect(service.findAllCategories()).rejects.toThrowError();
  });

  it('should return category after save ', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);
    const category = await service.createCategory(createCategoryMock);
    expect(category).toEqual(categoryMockEntity);
  });

  it('should return error if category name already exists', async() => {
    await expect(service.createCategory(createCategoryMock)).rejects.toThrowError();
  })

  it('should return error in exception', async () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error());
    await expect(service.createCategory(createCategoryMock)).rejects.toThrowError();
  });

  it('should return category by name', async () => {
    const categoryByName = await service.findCategoryByName(categoryMockEntity.name);
    expect(categoryByName).toEqual(categoryMockEntity);
  });

  it('should return error if category empty', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);
    await expect(service.findCategoryByName(categoryMockEntity.name)).rejects.toThrowError();
  });

});
