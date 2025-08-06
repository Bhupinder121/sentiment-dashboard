import { sendMail } from "@/app/helpers/sendMail";
import { NextRequest, NextResponse } from "next/server";
let code: string;

export async function GET(request: NextRequest) {

    code = await sendMail();

    
    return NextResponse.json({ "ok": "done" });

}

export async function POST(request: NextRequest){
    const data = await request.json();
    console.log(code);
    console.log(data);
    if(code == data.pin){
        return NextResponse.json({ "verified": true });
        // make db update
    }
    return NextResponse.json({ "verified": false });
    

}