import * as bcrypt from 'bcrypt'
import { Like } from 'typeorm'

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
}

export async function compareHash(rawPassword: string, hashedPassword: string) {
    return bcrypt.compare(rawPassword, hashedPassword)
}

export function randomRecoveryCode() {
    let rand = ''
    for (let i = 0; i < 8; i++) {
        rand += Math.floor(Math.random() * 10)
    }

    return rand
}

export function getRandomElements<T>(arr: T[], count: number): T[] {
    let shuffled = [...arr]
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled.slice(0, count)
}

export function bigIntTime() {
    return Math.floor(Date.now() / 1000)
}

export function generateRandomFundInCode() {
    let date = Date.now()
    let random = ''
    for (let i = 0; i < 8; i++) {
        date += Math.floor(Math.random() * 10)
        random += (
            '0' + ((Math.abs(Math.sin(date)) * 10000) % 10).toFixed(0)
        ).slice(-1)
    }
    return random
}
