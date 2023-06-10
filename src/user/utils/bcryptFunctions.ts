import * as bcrypt from 'bcrypt';


export const createPassword = async (pass: string) => {
    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(pass, saltOrRounds);
    return passwordHash;
}

export const verifyPassword = async (passRequest: string, passResponse: string) => {
    return await bcrypt.compare(passRequest, passResponse);
}
