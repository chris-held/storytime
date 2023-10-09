"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

type Props = {
  text: string;
};

const PlayStoryForm: React.FC<Props> = ({ text }) => {
  const [playState, setPlayState] = useState<
    "NOT_STARTED" | "PAUSED" | "PLAYING"
  >("NOT_STARTED");
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );

  const [voice, setVoice] = useState<SpeechSynthesisVoice | undefined>(
    undefined
  );

  useEffect(() => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();

    const u = new SpeechSynthesisUtterance(text);

    console.log(voices);

    setUtterance(u);
    setVoice(voices[0]);

    return () => {
      synth.cancel();
    };
  }, [text]);

  useEffect(() => {
    if (utterance) {
      utterance.voice = voice || null;
    }
  }, [voice]);

  const toggle = () => {
    const synth = window.speechSynthesis;

    if (!utterance) {
      return;
    }

    switch (playState) {
      case "NOT_STARTED":
        synth.speak(utterance);
        setPlayState("PLAYING");
        break;
      case "PAUSED":
        synth.resume();
        setPlayState("PLAYING");
        break;
      case "PLAYING":
        synth.pause();
        setPlayState("PAUSED");
      default:
        break;
    }
  };
  return (
    <Button
      onClick={toggle}
      className={`${playState !== "PLAYING" ? "" : "bg-green-700"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
        />
      </svg>
    </Button>
  );
};

export default PlayStoryForm;
