
import { createTransport, createTestAccount } from "nodemailer";


function getRandomInt() {
    let min = Math.ceil(0);
    let max = Math.floor(9);
    let code = ""
    for (let index = 0; index < 6; index++) {
        code += Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return code
}

async function getotp(code:string) {
    const transporter = createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "krystina66@ethereal.email",
            pass: "SHNz2cbtYCGDka69U7",
        },
    });
    console.log("code " + code);
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch" <krystal.waelchi@ethereal.email>',
        to: "t3339864@gmail.com",
        subject: "Hello ✔",
        text: `Your OTP is ${code}` // plain‑text body
    });

    console.log("Message sent:", info.messageId);
}


export async function sendMail(){
    let code = getRandomInt();
    getotp(code);
    return code;
}
