"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { ReactNode } from "react";



interface TransitionLinkProps extends LinkProps{
    children: ReactNode;
    href: string;
    className: string;
    aniName: string;
}

export const TransitionLink = ({
    children,
    href,
    className,
    aniName,
    ...props
}: TransitionLinkProps)=>{
    const router = useRouter();
    let minisec = 300;


    function sleep(time: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, time));
    }


    const handleClick = async (e: React.MouseEvent, aniName: string)=>{
        e.preventDefault();
        e.currentTarget.classList.add(aniName);
        // await sleep(minisec)

        document.querySelector('.test')?.classList.add('animate-bodyAni')
        router.push("/login")
        // e.currentTarget?.classList.remove(aniName);
        await sleep(minisec)

        document.querySelector('.test')?.classList.remove('animate-bodyAni')

    }
    
    return(
        <Link href={href} onClick={(e: React.MouseEvent)=> handleClick(e, aniName)} className={className} {...props}>
            {children}
        </Link>
    )
}