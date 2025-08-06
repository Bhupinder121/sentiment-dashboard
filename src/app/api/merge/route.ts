// app/api/merge/route.ts
import { readdir, readFile, writeFile, rm } from 'fs/promises'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path';
import { parse } from 'csv-parse';
// import pdfParse from 'pdf-parse';
import fs from 'fs';

export async function POST(req: NextRequest) {
  const { fileName, fileId } = await req.json()
  const chunksDir = join(process.cwd(), 'chunks', fileId)
  const finalPath = join(process.cwd(), 'public', 'uploads', fileName)

  const chunkFiles = (await readdir(chunksDir)).sort((a, b) => Number(a) - Number(b))
  const buffers = await Promise.all(
    chunkFiles.map((chunkFile) => readFile(join(chunksDir, chunkFile)))
  )

  await writeFile(finalPath, Buffer.concat(buffers))
  await rm(chunksDir, { recursive: true, force: true })
  const ext = path.extname(fileName).toLowerCase();
  console.log(finalPath)
  const analysis: any = {
    type: ext,
    hasColumns: false,
    columnNames: [],
  };
  
  try {
    const fileContent = fs.readFileSync(finalPath, 'utf-8');

    if (ext === '.csv') {
      parse(fileContent, { delimiter: ',', columns: true }, (err, output) => {
        if (err) return NextResponse.json({status: 400, error: 'CSV parse error' });
        const keys = Object.keys(output[0] || {});
        analysis.hasColumns = keys.length > 0;
        analysis.columnNames = keys;
        return NextResponse.json({status: 200, analysis});
      });
    } else if (ext === '.json') {
      const json = JSON.parse(fileContent);
      if (Array.isArray(json) && typeof json[0] === 'object') {
        const keys = Object.keys(json[0]);
        analysis.hasColumns = true;
        analysis.columnNames = keys;
      }
      return NextResponse.json({status: 200, analysis});
    } else if (ext === '.txt') {
      analysis.hasColumns = false;
      return NextResponse.json({status: 200, analysis});
    } 
    // else if (ext === '.pdf') {
    //   const dataBuffer = fs.readFileSync(finalPath);
    //   const pdfData = await pdfParse(dataBuffer);
    //   const text = pdfData.text;

    //   analysis.hasColumns = detectTabularContent(text); // Optional preview
    //   return NextResponse.json({status: 200, analysis});
    // } 
    else {
      return NextResponse.json({status: 415, error: 'Unsupported file type' });
    }
  } catch (e:any) {
    return NextResponse.json({status: 500, error: 'Failed to analyze file', details: e.message });
  }



  // return NextResponse.json({ message: 'File merged', path: `/uploads/${fileName}` })
}

function detectTabularContent(text: string) {
  const lines = text.split('\n').filter(Boolean);
  const potentialColumns = lines.filter(line => line.split(/\s{2,}/).length > 2);
  return potentialColumns.length > 2;
}