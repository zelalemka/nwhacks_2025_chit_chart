import { useState } from 'react'
import { Mic, MicOff, Loader2 } from 'lucide-react'

export function MicrophoneButton({ 
  onStartRecording, 
  onStopRecording,
  className = ''
}) {
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    try {
      setIsLoading(true)
      if (!isRecording) {
        await onStartRecording()
        setIsRecording(true)
      } else {
        await onStopRecording()
        setIsRecording(false)
      }
    } catch (error) {
      console.error('Recording error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        relative flex items-center justify-center w-12 h-12
        rounded-full transition-all duration-200
        ${isRecording 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-blue-500 hover:bg-blue-600'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {isLoading ? (
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      ) : isRecording ? (
        <MicOff className="w-6 h-6 text-white" />
      ) : (
        <Mic className="w-6 h-6 text-white" />
      )}
      {isRecording && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full">
          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping" />
        </span>
      )}
    </button>
  )
}

