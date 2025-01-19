import { useState, useEffect, useRef, Suspense } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useAudioRecorder } from "react-audio-voice-recorder";
import { LiveAudioVisualizer } from "react-audio-visualize";

export function MicrophoneButton({ onTranscriptChange, className = '' }) {
  const [isLoading, setIsLoading] = useState(false);
  const visualizerContainerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const recorderControls = useAudioRecorder();

  useEffect(() => {
    onTranscriptChange(transcript);
  }, [transcript, onTranscriptChange]);

  function stopRecording() {
    onTranscriptChange('', false);
    resetTranscript();
    recorderControls.stopRecording();
  }

  const handleClick = async () => {
    try {
      setIsLoading(true);
      if (!listening) {
        await SpeechRecognition.startListening({ continuous: true });
        recorderControls.startRecording();
      } else {
        SpeechRecognition.stopListening();
        stopRecording();
      }
    } catch (error) {
      console.error('Recording error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const container = visualizerContainerRef.current;

    if (container) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          setContainerSize({ width, height });
        }
      });

      resizeObserver.observe(container);

      return () => resizeObserver.disconnect();
    }
  }, []);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='flex flex-row'>
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
      <div className="w-full pl-6 pr-6" ref={visualizerContainerRef}>
        {recorderControls.mediaRecorder ? (
          <Suspense>
            <LiveAudioVisualizer
              mediaRecorder={recorderControls.mediaRecorder}
              barWidth={5}
              gap={2}
              minDecibels={-55}
              width={containerSize.width}
              height={containerSize.height}
            />
          </Suspense>
        ) : (
          <div className="h-1/2 border-b-2 border-dashed" style={{ width: containerSize.width }}></div>
        )}
      </div>
    </div>
  );
}
