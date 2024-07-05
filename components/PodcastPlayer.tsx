"use client"
import { cn } from '@/lib/utils';
import { useAudio } from '@/providers/AudioProvider'
import React, { useEffect, useRef, useState } from 'react'
import { Progress } from './ui/progress';
import Link from 'next/link';
import Image from 'next/image';
import { formatTime } from '@/lib/formateTime';

const PodcastPlayer = () => {
    const {audio} = useAudio();

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPalying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);

    const handleRewind = () => {
        if(audioRef.current && audioRef.current.currentTime - 5 > 0){
            audioRef.current.currentTime -= 5;
        }else if(audioRef.current){
            audioRef.current.currentTime = 0;
        }
    }

    const handleForward = () => {
        if(
            audioRef.current &&
            audioRef.current.currentTime &&
            audioRef.current.duration &&
            audioRef.current.currentTime + 5 < audioRef.current.duration
        ){
            audioRef.current.currentTime += 5;
        }
    }

    const togglePlayPause = () => {
        if(audioRef.current?.paused){
            audioRef.current.play();
            setIsPlaying(true)
        }else{
            audioRef.current?.pause();
            setIsPlaying(false);
        }
    }

    const toggleMute = () => {
        if(audioRef.current){
            audioRef.current.muted = !isMuted;
            setIsMuted((prev) => !prev);
        }
    }

    const handleOnLoadedMetaData =() => {
        if(audioRef.current){
            setDuration(audioRef.current.duration);
        }
    }

    const handleOnEnded =() => {
        setIsPlaying(false)
    }

    useEffect(() => {
        const updateCurrentTime = () => {
            if(audioRef.current){
                setCurrentTime(audioRef.current.currentTime)
            }
        }

        const audioElement = audioRef.current;

        if(audioElement){
            audioElement.addEventListener("timeupdate", updateCurrentTime);

            return () => {
                audioElement.removeEventListener("timeupdate", updateCurrentTime)
            }
        }
    }, []); 

    useEffect(() => {
        const audioElement = audioRef.current;
        if(audio?.audioUrl){
            if(audioElement){
                audioElement.play().then(() => {
                    setIsPlaying(true)
                })
            }
        }else{
            audioElement?.pause();
            setIsPlaying(false);
        }
    }, [audio])
  return (
    <div
        className={cn("sticky bottom-0 left-0 flex flex-col size-full", {"hidden": !audio?.audioUrl || audio.audioUrl === ""})}
    >
        <Progress
            value={(currentTime/duration)*100}
            className='w-full h-[2px]'
            max={duration}
        ></Progress>

        <section className='glassmorphism-black flex h-[80px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12'>
            <audio
                ref={audioRef}
                src={audio?.audioUrl}
                className="hidden"
                onLoadedMetadata={handleOnLoadedMetaData}
                onEnded={handleOnEnded}
            ></audio>

            <div className='flex items-center gap-4 max-md:hidden'>
                <Link href={`/podcast/${audio?.podcastId}`}>
                    <Image
                        src={audio?.imageUrl || "/images/player1.png"}
                        alt='player'
                        height={60}
                        width={60}
                        className="aspect-square rounded-lg"
                    ></Image>
                </Link>
                <div className='flex w-[160px] flex-col'>
                    <h2 className='text-14 truncate font-semibold text-white-1'>{audio?.title}</h2>
                    <p className='text-12 font-normal text-white-2'>{audio?.author}</p>
                </div>
            </div>
            <div className='flex-center cursor-pointer gap-3 md:gap-6'>
                <div className='flex items-center gap-1.5'>
                    <Image
                        src="/icons/reverse.svg"
                        alt='reverse'
                        width={24}
                        height={24}
                        onClick={handleRewind}
                    ></Image>
                    <p className='text-12 font-bold text-white-4'>-5</p>
                </div>
                <Image
                    src={isPalying ? "/icons/Pause.svg" : "/icons/Play.svg"}
                    alt='play'
                    width={30}
                    height={30}
                    onClick={togglePlayPause}
                ></Image>
                <div className='flex items-center gap-1.5'>
                    <p className='text-12 font-bold text-white-4'>+5</p>
                    <Image
                        src="/icons/forward.svg"
                        alt='forward'
                        width={24}
                        height={24}
                        onClick={handleForward}
                    ></Image>
                </div>
            </div>

            <div className='flex items-center gap-6'>
                {/* TODO: LOOP */}
                <h2 className='text-16 font-normal text-white-2 max-md:hidden'>{formatTime(duration)}</h2>
                <div className='flex w-full gap-2'>
                    <Image
                        src={isMuted ? "/icons/unmute.svg" : "/icons/mute.svg"}
                        width={24}
                        height={24}
                        alt='mute unmute'
                        onClick={toggleMute}
                        className="cursor-pointer"
                    ></Image>
                </div>
            </div>
        </section>
    </div>
  )
}

export default PodcastPlayer