
import { GeneratePodcastProps } from '@/types'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import {v4 as uuidv4} from "uuid"
import {useUploadFiles} from "@xixixao/uploadstuff/react"
import { useToast } from "@/components/ui/use-toast"



const useGeneratePodcast = ({setAudio, voiceType, voicePrompt, setAudioStorageId}: GeneratePodcastProps) => {
  const [isGenenrating, setIsGenenrating] = useState(false);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const {startUpload} = useUploadFiles(generateUploadUrl)
  const { toast } = useToast()

  const getPodcastAudio = useAction(api.openai.generateAudioAction)

  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const generatePodcast = async() => {
    setIsGenenrating(true);
    setAudio("");

    if(!voicePrompt){
      toast({
        title: "Please provide a voice type",
      })
      return setIsGenenrating(false);
    }

    try {
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt
      })

      const blob = new Blob([response], {type: "audio/mpeg"});
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, {type: "audio/mpeg"});

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);

      const audioUrl = await getAudioUrl({storageId});
      setAudio(audioUrl!);
      setIsGenenrating(false);
      toast({
        title: "Podcast generated successfully",
      })
    } catch (error) {
      console.log("Error generating podcast", error);
      toast({
        title: "Error creating a podcast",
        variant: "destructive"
      })
      setIsGenenrating(false);
    }
  }

  return {
    isGenenrating,
    generatePodcast
  }
}

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const {isGenenrating, generatePodcast} = useGeneratePodcast(props)
  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to generate Podcast
        </Label>
        <Textarea 
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder="Provide Text To Generate Audio"
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        ></Textarea>
      </div>

      <div className='mt-5 flex justify-end'>
        <Button className='text-16 bg-orange-1 py-4 font-extrabold text-white-1' disabled={isGenenrating} onClick={generatePodcast}>
          {
            isGenenrating ? (
              <div className="flex gap-2">
                Generating
                <Loader size={20} className="animate-spin"></Loader>
              </div>
            ) : (
              "Generate"
            )
          }
        </Button>
      </div>

      {
        props.audio && (
          <audio
            controls
            src={props.audio}
            autoPlay
            className='mt-5'
            onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
          ></audio>
        )
      }
    </div>
  )
}

export default GeneratePodcast