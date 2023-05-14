import { cityMockEntity } from "../../city/__mocks__/city.mock";
import { AddressEntity } from "../interfaces/address.entity";
import { userEntityMock } from "../../user/__mocks__/user.mock";

export const addressMockEntity: AddressEntity = {
    id: 1,
    complement: "Rua Teste",
    cep: "57032065",
    cityId: cityMockEntity.id,
    numberAddress: 44,
    userId: userEntityMock.id,
    createdAt: new Date(),
    updatedAt: new Date()
}