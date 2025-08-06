import mysql from 'mysql2/promise'
import { loadEnvConfig } from '@next/env'

interface IDBSettings {
    host: string

    port: number

    user: string

    password: string

    database: string
}

const GetDBSettings = (): IDBSettings => {
    const projectDir = process.cwd()
    loadEnvConfig(projectDir)
    
    const env = process.env.NODE_ENV
    console.log(projectDir)
    return {
        host: process.env.DB_HOST!,

        port: parseInt(process.env.DB_PORT!),

        user: process.env.DB_USER!,

        password: process.env.DB_PASS!,

        database: process.env.DB_DATABASE!,
    }

}


async function makeQuery(query: string) {
    let connectionParams = GetDBSettings();
    try{
        const connection = await mysql.createConnection(connectionParams);
        let values: any[] = []

        const [result] = await connection.execute(query, values);

        connection.end()
        return result
    } catch(err){
        console.log('ERROR: API - ', (err as Error).message)
        return null;
    }
}

// export async function storeOTP(create: boolean, userID: string, otp: string, expireAt: String){
//     if(create){
//         return await makeQuery(`INSERT INTO otp VALUES ('${userID}', '${otp[]}', '${userEmail}')`)
//     }
// }

export async function AddUser(userID: string, userName: string, userEmail: string, userHash: string) {
    return await makeQuery(`INSERT INTO user VALUES ('${userID}', '${userName}', '${userEmail}', '${userHash}', 0)`)
} 

export async function verifyUser(email: string){
    // await bcrypt.hash(hash, 10)
    
    return await makeQuery(`Select * from user where userEmail = '${email}'`)
}