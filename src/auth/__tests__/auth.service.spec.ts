import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { jwtMock } from '../__mocks__/jwt.mock';
import { loginUserMock } from '../__mocks__/loginUser.mock';
import { ReturnUserDto } from '../../user/dtos/returnUser.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByMail: jest.fn().mockResolvedValue(userEntityMock)
          }
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: () => jwtMock,
          }
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user if password and email valid', async () => {
    const user = await service.signIn(loginUserMock);
    expect(user).toEqual({
      accessToken: jwtMock,
      user: new ReturnUserDto(userEntityMock)
    });
  });

  it('should return error if email not exists', async () => {
    jest.spyOn(userService, 'findUserByMail').mockResolvedValue(undefined);
    expect(service.signIn(loginUserMock)).rejects.toThrowError();
  });

  it('should return error if password invalid and mail valid', async () => {
    await expect(
      service.signIn({ ...loginUserMock, pass: '1234' })
    ).rejects.toThrowError();
  });

  it('should return in UserService', async () => {
    jest.spyOn(userService, 'findUserByMail').mockRejectedValue(new Error());
    expect(service.signIn(loginUserMock)).rejects.toThrowError();
  })

});
