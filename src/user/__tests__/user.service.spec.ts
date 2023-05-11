import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../interfaces/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../__mocks__/user.mock';
import { createUserMock } from '../__mocks__/createUserMock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(userEntityMock),
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock)
          }
        }],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity)
    )
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findUserByEmail ', async () => {
    const user = await service.findUserByMail(userEntityMock.email);
    expect(user).toEqual(userEntityMock)
  });

  it('should return null in findUserByEmail ', async () => {
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);

    const user = await service.findUserByMail(userEntityMock.email);

    expect(user).toBeNull;

  });

  it('should return user in findUserById', async () => {
    const user = await service.findUserById(userEntityMock.id);
    expect(user).toEqual(userEntityMock);

  });

  it('should return error in findUserById', async () => {
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);

    expect(
      service.findUserById(userEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return user in findUserWithRelation', async () => {
    const user = await service.findUserWithRelation(userEntityMock.id);
    expect(user).toEqual(userEntityMock);
  });

  it('should return error if user exists', async () => {
    await expect(service.createUser(createUserMock)).rejects.toThrowError();
  });

  it('should return new user if user not exists', async () => {

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);

    const user = await service.createUser(createUserMock);

    expect(user).toEqual(userEntityMock)
  });


});
