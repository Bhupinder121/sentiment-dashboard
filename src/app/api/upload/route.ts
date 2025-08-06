// import { writeFile } from "fs/promises";
// import { NextApiRequest } from "next";
// import { NextRequest, NextResponse } from "next/server";
// import path from "path";

// // app/api/my-endpoint/route.js
// export async function POST(req: NextRequest) {

//   const formData = await req.formData();
//   console.log(formData.get("file"))
  
//   // logChunks(req.body)
//   const file = formData.get("file") as File;
//   if (!file) {
//     return NextResponse.json({ error: "No files received." }, { status: 400 });
//   }

//   const buffer = Buffer.from(await file.arrayBuffer());
//   const filename =  file.name.replaceAll(" ", "_");
//   console.log(filename);
//   try {
//     await writeFile(
//       path.join(process.cwd(), "public/uploads/" + filename),
//       buffer
//     );
//     return NextResponse.json({ Message: "Success", status: 201 });
//   } catch (error) {
//     console.log("Error occured ", error);
//     return NextResponse.json({ Message: "Failed", status: 500 });
//   }
// }

// async function logChunks(readable: any) {
//   for await (const chunk of readable) {
//     var string = new TextDecoder().decode(chunk);
//     console.log("slfjslfjas'fjaf'sajfs'lfjsa;lfhsdg;lsdhg;osifhedogfihfdg;odfhg;sdalfhsa;lfhkfsd")
//     console.log(string);
//   }
// }

// app/api/upload/route.ts
import fs from "fs"
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { IncomingForm } from 'formidable'
import { Readable } from 'stream'
import { IncomingMessage } from 'http'

export const config = { api: { bodyParser: false } }

function toNodeReq(req: NextRequest): Promise<IncomingMessage> {
  const reader = req.body?.getReader()
  const stream = new Readable({
    async read() {
      if (!reader) return this.push(null)
      const { done, value } = await reader.read()
      if (done) return this.push(null)
      this.push(Buffer.from(value))
    },
  })
  return Promise.resolve(Object.assign(stream, {
    headers: Object.fromEntries(req.headers.entries()),
    method: req.method || 'POST',
    url: req.url || '',
  }) as any)
}

export async function POST(req: NextRequest) {
  const nodeReq = await toNodeReq(req)

  const form = new IncomingForm({ multiples: true, uploadDir: '/tmp', keepExtensions: true })

  const data: any = await new Promise((resolve, reject) => {
    form.parse(nodeReq, (err, fields, files) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })

  const { chunk } = data.files
  const { fileName, fileId, index } = data.fields
  const uploadDir = join(process.cwd(), 'chunks', fileId[0])
  await mkdir(uploadDir, { recursive: true })
  
  const fileData = await fs.promises.readFile(chunk[0].filepath)
  await writeFile(join(uploadDir, `${index}`), fileData)
  
  return NextResponse.json({ message: 'Chunk uploaded' })
}

