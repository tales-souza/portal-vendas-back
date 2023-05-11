import { UserEntity } from '../interfaces/user.entity';

export const userEntityMock: UserEntity = {
    cpf: '123456789',
    createdAt: new Date(),
    email: 'testemail@gmail.com',
    id: 444,
    name: "tales monteiro",
    password: "test123",
    phone: '33535335353535',
    typeUser: 1,
    updatedAt: new Date()
};