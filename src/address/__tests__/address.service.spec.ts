import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from '../address.service';
import { Repository } from 'typeorm';
import { AddressEntity } from '../interfaces/address.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { addressMockEntity } from '../__mocks__/address.mock';
import { UserService } from '../../user/user.service';
import { CityService } from '../../city/city.service';
import { createAddressMock } from '../__mocks__/createAddress.mock';
import { cityMockEntity } from '../../city/__mocks__/city.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';



describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>
  let userService: UserService;
  let cityService: CityService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressService, {
        provide: getRepositoryToken(AddressEntity),
        useValue: {
          save: jest.fn().mockResolvedValue(addressMockEntity),
          
        }
      },
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue([userEntityMock])
          },
         },
        {
          provide: CityService,
          useValue: {
            findCityById: jest.fn().mockResolvedValue(cityMockEntity),
          }
        }],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(addressRepository).toBeDefined();
    expect(cityService).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('shloud return address after save', async () => {
    const address = await service.createAdress(createAddressMock, addressMockEntity.id);
    expect(address).toEqual(addressMockEntity);
  });


  it('should return error if exception in userService', async () => {
    jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new Error());

    expect(
      service.createAdress(createAddressMock, userEntityMock.id),
    ).rejects.toThrowError();
  });

  
  it('should return error if exception in cityService', async () => {
    jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new Error());
    await expect(service.createAdress(createAddressMock, addressMockEntity.userId)).rejects.toThrowError()
  });


});
