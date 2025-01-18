import { useState, useEffect } from 'react'
import { Mic, MicOff, Loader2 } from 'lucide-react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export function MicrophoneButton({ onTranscriptChange, className = '' }) {
  const [isLoading, setIsLoading] = useState(false)
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  useEffect(() => {
    onTranscriptChange(transcript)
  }, [transcript, onTranscriptChange])

  const handleClick = async () => {
    try {
      setIsLoading(true)
      if (!listening) {
        await SpeechRecognition.startListening({ continuous: true })
      } else {
        SpeechRecognition.stopListening()
        resetTranscript()
      }
    } catch (error) {
      console.error('Recording error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        relative flex items-center justify-center w-12 h-12
        rounded-full transition-all duration-200
        ${listening 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-blue-500 hover:bg-blue-600'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {isLoading ? (
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      ) : listening ? (
        <MicOff className="w-6 h-6 text-white" />
      ) : (
        <Mic className="w-6 h-6 text-white" />
      )}
      {listening && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full">
          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping" />
        </span>
      )}
    </button>
  )
}

