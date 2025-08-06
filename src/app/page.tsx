import { TransitionLink } from "./TransitionLink";

export default function Home() {
  
  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <TransitionLink href='#' className="rounded-full size-20 play" aniName="animate-testAni">
        <span style={{ position: 'relative', top: '25px' }}>|{">"}</span>
      </TransitionLink>
    </div>

  );
}
