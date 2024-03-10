import * as bcrypt from 'bcrypt'
import { Like } from 'typeorm'

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
}

export async function compareHash(rawPassword: string, hashedPassword: string) {
    return bcrypt.compare(rawPassword, hashedPassword)
}
