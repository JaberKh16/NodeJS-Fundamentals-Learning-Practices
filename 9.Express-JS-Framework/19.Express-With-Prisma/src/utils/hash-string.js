import bcrypt from 'bcryptjs';


export async function hashedString(string, saltRounds = 10){
    return await bcrypt.hash(string, saltRounds);
}