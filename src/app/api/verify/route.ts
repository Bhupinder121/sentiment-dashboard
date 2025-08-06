// app/api/products/route.js
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { verifyUser } from '@/app/_lib/common';
import { QueryResult } from 'mysql2';
import { createSession } from '@/app/_lib/session';


export async function POST(request: NextRequest) {

    const data = await request.json()

    // const hash = await bcrypt.hash(data.password, 10);

    // console.log(hash)

    const userId = await verifyUser(data.email)


    if (!userId) {
        return NextResponse.json({ "error": "Error while connecting, Please try again later" });
    }
    if (userId.length == 0) {
        return NextResponse.json({ "error": "No User Found!" });
    }
    const isCorrect = await bcrypt.compare(data.password, userId[0].userHash)

    if (!isCorrect) {
        return NextResponse.json({ "error": "Wrong Password" });

    }
    let coode = await createSession(userId[0].userID);
    return NextResponse.json({ "code": "ok" });

}