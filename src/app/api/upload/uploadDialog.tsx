"use client";

import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { UpdateStatus } from "@/components/upload-state";
import { toast } from "sonner";

export function UploadButton(prop: any) {
    const [file, setFile] = useState<File | null>(null)
    const [dropped, setDropped] = useState(false);
    const [open, setOpen] = useState<boolean | undefined>(false);
    const [show, setShow] = useState<boolean>(false);
    const inputRef = useRef(null);
    const [progress, setProgress] = useState(0);


    const CHUNK_SIZE = 1024 * 1024 // 1MB

    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            setDropped(true);
            setFile(selectedFile)
            // Do something with the file
        }
    };



    const handleDragOver = (e: any) => {
        e.preventDefault();
        setDropped(false);
    }


    const handleDragLeave = (e: any) => {
        e.preventDefault();
        setDropped(false);
    }

    const handleDrop = (e: any) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setDropped(true);
            const files = e.dataTransfer.files[0];
            setFile(files)
        }

    }




    const uploadFile = async (file: File) => {
        // const totalChunks = Math.ceil(file.size / CHUNK_SIZE)
        // const fileId = `${file.name}-${Date.now()}`

        // for (let index = 0; index < totalChunks; index++) {
        //     const start = index * CHUNK_SIZE
        //     const end = Math.min(start + CHUNK_SIZE, file.size)
        //     const chunk = file.slice(start, end)

        //     const formData = new FormData()
        //     formData.append('chunk', chunk)
        //     formData.append('fileName', file.name)
        //     formData.append('fileId', fileId)
        //     formData.append('index', index.toString())
        //     formData.append('totalChunks', totalChunks.toString())

        //     await fetch('/api/upload', {
        //         method: 'POST',
        //         body: formData,
        //     })

        //     setProgress(Math.round(((index + 1) / totalChunks) * 100))
        //     // console.log(progress)

        // }

        // Trigger merge after all chunks uploaded
        // const res = await fetch('/api/merge', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ fileName: file.name, fileId }),
        // })

        let data = new FormData()
        data.append('file', file)
        try {
            const res = await fetch("http://192.168.0.118:8000/savefile", {
                method: "POST",
                body: data
            })

            console.log(res);
            prop.check();
        } catch (error: unknown) {
            console.log({"error": error});
            toast.error("Error> While uploading file. Please try again later", {});
        }


        // alert('Upload complete!')
    }





    const handleClick = async () => {
        if (file == null) {
            return null;
        }
        setProgress(0)
        uploadFile(file);
        setDropped(false);
        setOpen(false);
        setShow(true);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
        setTimeout(() => {
            setOpen(false);

        }, 100)

    }

    const Reset = () => {
        setShow(false);
        setFile(null)
        setProgress(0);
    }


    return (
        <div>
            {/* <UpdateStatus active={show} progress={progress}></UpdateStatus>

            <Button onClick={Reset} className={`fixed z-13 right-5 bottom-17 bg-transparent rounded-full size-2 ${show ? "visible" : "invisible"}`}>
                <span className="text-black">X</span>
            </Button> */}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger >
                    <span className="p-1.5">Quick Create</span></DialogTrigger>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Upload</DialogTitle>
                        <DialogDescription>
                            supported txt
                        </DialogDescription>

                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg viewBox="0 0 1024 1024" className="icon h-19" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier"><path d="M768 810.7c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7c94.1 0 170.7-76.6 170.7-170.7 0-89.6-70.1-164.3-159.5-170.1L754 383l-10.7-22.7c-42.2-89.3-133-147-231.3-147s-189.1 57.7-231.3 147L270 383l-25.1 1.6c-89.5 5.8-159.5 80.5-159.5 170.1 0 94.1 76.6 170.7 170.7 170.7 23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7c-141.2 0-256-114.8-256-256 0-126.1 92.5-232.5 214.7-252.4C274.8 195.7 388.9 128 512 128s237.2 67.7 297.3 174.2C931.5 322.1 1024 428.6 1024 554.7c0 141.1-114.8 256-256 256z" fill="#3688FF"></path><path d="M640 789.3c-10.9 0-21.8-4.2-30.2-12.5L512 679l-97.8 97.8c-16.6 16.7-43.7 16.7-60.3 0-16.7-16.7-16.7-43.7 0-60.3l128-128c16.6-16.7 43.7-16.7 60.3 0l128 128c16.7 16.7 16.7 43.7 0 60.3-8.4 8.4-19.3 12.5-30.2 12.5z" fill="#5F6379"></path><path d="M512 960c-23.6 0-42.7-19.1-42.7-42.7V618.7c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v298.7c0 23.5-19.1 42.6-42.7 42.6z" fill="#5F6379"></path></g></svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{dropped ? `file uploaded ${file?.name}` : "Click to upload or drag and drop"}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Only Text File Supported</p>
                                </div>
                                <Input ref={inputRef} id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                            </label>
                        </div>
                        <Button disabled={!dropped} onClick={handleClick}>Upload</Button>

                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}