import { userEntityMock } from "../../user/__mocks__/user.mock";
import { signInDto } from "../dtos/signIn.dto";

export const loginUserMock : signInDto = {
email: userEntityMock.email,
pass: 'abc'
}