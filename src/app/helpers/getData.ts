import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '../_lib/session'


async function getUserID(){
    const cookie = (await cookies()).get('session')?.valueOf() as string
    const session = await decrypt(cookie)
    return session
}