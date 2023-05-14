import { StateEntity } from "../interfaces/state.entity";

export const stateEntityMock: StateEntity = {
    id: 1,
    name: 'Estado Teste',
    uf: 'ET',
    createdAt: new Date(),
    updatedAt: new Date(),
    cities: []
}