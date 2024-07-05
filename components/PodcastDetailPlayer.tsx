"use client"
import { PodcastDetailPlayerProps } from '@/types'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import { useAudio } from '@/providers/AudioProvider'

const PodcastDetailPlayer = ({
  audioUrl,
  podcastTitle,
  author,
  imageUrl,
  podcastId,
  imageStorageId,
  audioStorageId,
  isOwner,
  authorImageUrl,
  authorId,
}: PodcastDetailPlayerProps) => {

    const { toast } = useToast();
    const router = useRouter();

    const [isDeleting, setIsdeleting] = useState(false);

    const deletePodcast = useMutation(api.podcasts.deletePodcast);

    const {setAudio} = useAudio()

    const handleDelete = async() => {
        try {
            await deletePodcast({podcastId, imageStorageId, audioStorageId});
            toast({
                title: "Podcast deleted"
            })
            router.push("/")
        } catch (error) {
            console.error("Error deleting podcast", error);
            toast({
                title: "Error deleting podcast",
                variant: "destructive",
            });
        }
    }

    const handlePlay = () => {
        setAudio({
            title: podcastTitle,
            imageUrl,
            audioUrl,
            author,
            podcastId
        })
    }

  return (
    <div className='mt-6 flex w-full justify-between max-md:justify-center'>
        <div className='flex flex-col gap-8 max-md:items-center md:flex-row'>
            <Image
                src={imageUrl}
                width={250}
                height={250}
                alt='podcast image'
                className="aspect-square rounded-lg"
            ></Image>
            <div className='flex w-full flex-col gap-5 max-md:items-center md:gap-9'>
                <article className='flex flex-col gap-2 max-md:items-center'>
                    <h1 className='text-32 font-extrabold tracking-[-0.32px] text-white-1'>
                        {podcastTitle}
                    </h1>
                    <div 
                        className='flex cursor-pointer items-center gap-2'
                        onClick={() => router.push(`/profile/${authorId}`)}
                    >
                        <Image
                            src={authorImageUrl}
                            width={30}
                            height={30}
                            alt='caster image'
                            className='rounded-full object-cover'
                        ></Image>
                        <h2 className='text-16 font-normal text-white-3'>{author}</h2>
                    </div>
                </article>

                <Button 
                    className='text-16 flex gap-2 w-full max-w-[250px] bg-orange-1 font-extrabold text-white-1'
                    onClick={handlePlay}
                >
                    <Image
                        src="/icons/Play.svg"
                        width={20}
                        height={20}
                        alt="random play"
                    ></Image>
                    Play podcast
                </Button>
            </div>
        </div>

        {
            isOwner && (
                <div className='relative mt-2'>
                    <Image
                        src="/icons/three-dots.svg"
                        width={20}
                        height={30}
                        alt="Three dots icon"
                        className="cursor-pointer"
                        onClick={() => setIsdeleting((prev) => !prev)}
                    ></Image>

                    {
                        isDeleting && (
                            <div className='absolute -left-32 -top-3 z-10 flex w-32 cursor-pointer justify-center gap-2 rounded-md bg-black-6 py-1.5 hover:bg-black-2' onClick={handleDelete}>
                                <Image
                                    src="/icons/delete.svg"
                                    width={16}
                                    height={16}
                                    alt="Delete icon"
                                />
                                <h2 className="text-16 font-normal text-white-1">Delete</h2>
                            </div>
                        )
                    }
                </div>
            )
        }
    </div>
  )
}

export default PodcastDetailPlayer