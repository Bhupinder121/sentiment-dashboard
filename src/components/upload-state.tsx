import { div } from "framer-motion/client"
import { CircularProgressbar } from "react-circular-progressbar"

interface props {
    progress: number,
    active: boolean
}


export function UpdateStatus({ progress, active }: props) {

    return (
        <div className={active ? "visible" : "invisible"}>
            <div className="border-1 bg-white z-11 fixed bottom-0  w-35 rounded-full flex flex-row m-2 p-2">
                <div className="size-16 p-2 flex justify-center items-center">
                    <CircularProgressbar text={`${progress}%`} styles={{
                        // Customize the root svg element
                        root: {},
                        // Customize the path, i.e. the "completed progress"

                        // Customize the circle behind the path, i.e. the "total progress"

                        // Customize the text
                        text: {
                            // Text color
                            fill: '#00',
                            // Text size
                            fontSize: '22px',
                        }
                    }}
                        value={progress} />
                </div>
                <div className="flex justify-center items-center ">
                    <span className="text-sm">Uploading...</span>
                </div>
            </div>
        </div>
    )

}