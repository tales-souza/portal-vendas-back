import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from '../city.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '../interfaces/city.entity';
import { cityMockEntity } from '../__mocks__/city.mock';
import { CacheService } from '../../cache/cache.service';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService,
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(cityMockEntity),
            findOneBy: jest.fn().mockResolvedValue(cityMockEntity)
          }
        },
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMockEntity])
          }
        }
      ],
    }).compile();


    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity)
    )
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return city by id', async () => {
    const city = await service.findCityById(cityMockEntity.id);
    expect(city).toEqual(cityMockEntity);
  });

  it('should return all cities by id', async () => {
    const cities = await service.getAllCitiesByStateId(cityMockEntity.id);
    expect(cities).toEqual([cityMockEntity]);
  });

  it('should return error if city not exists', async () => {
    jest.spyOn(cityRepository, 'findOneBy').mockResolvedValue(undefined);
    await expect(service.findCityById(cityMockEntity.id)).rejects.toThrowError();
  });

});
