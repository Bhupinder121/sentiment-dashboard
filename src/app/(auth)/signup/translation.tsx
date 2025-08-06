"use client";

import {motion} from 'framer-motion';


export default function Transition() {
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{ease: 'easeInOut', duration: 1}}>
            TEst
        </motion.div>
}

