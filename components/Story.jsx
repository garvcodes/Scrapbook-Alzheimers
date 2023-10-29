import React, { useState } from 'react';
import axios from 'axios';
import Link from "next/link";

const SpeechToText = ({ onTranscriptUpdate }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition API not supported in this browser!');
      return;
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const newMediaRecorder = new MediaRecorder(stream);
          let audioChunks = [];

          newMediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
          };

          newMediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const newAudioURL = URL.createObjectURL(audioBlob);
            setAudioURL(newAudioURL);
          };

          newMediaRecorder.start();
          setMediaRecorder(newMediaRecorder);

          const recognitionInstance = new SpeechRecognition();
          recognitionInstance.continuous = true;
          recognitionInstance.interimResults = true;
          recognitionInstance.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = transcript;

            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
              } else {
                interimTranscript += event.results[i][0].transcript;
              }
            }

            setTranscript(finalTranscript);
            onTranscriptUpdate(finalTranscript + interimTranscript);
          };

          recognitionInstance.start();
          setIsRecording(true);
          setRecognition(recognitionInstance);
        });
    }
  };

  const stopRecording = async () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
      setRecognition(null);
      onTranscriptUpdate(transcript);
    }
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
    }
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioURL && (
        <div>
          <button onClick={() => {
            const audio = new Audio(audioURL);
            audio.play();
          }}>
            Play Recording
          </button>
        </div>
      )}
      {transcript && <p>Transcript: {transcript}</p>}
    </div>
  );
};

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const handleTranscriptUpdate = (newTranscript) => {
    setPost({ ...post, prompt: newTranscript });
  };

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='orange_gradient'>{type} Memory</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} memories within your database to make it available to our AI 
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your Memory
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your memory here'
            required
            className='form_textarea '
          />
        </label>
        
        <SpeechToText onTranscriptUpdate={handleTranscriptUpdate} />

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            What is your memory about?{" "}
            <span className='font-normal'>
              (#family, #friends, #life, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
