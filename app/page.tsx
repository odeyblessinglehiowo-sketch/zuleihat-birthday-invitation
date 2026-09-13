"use client";

import { useRef, useState } from "react";

import OpeningEnvelope from "./components/OpeningEnvelope";
import BirthdayHero from "./components/BirthdayHero";
import BirthdayDetails from "./components/BirthdayDetails";
import AudioToggle from "./components/AudioToggle";
import CountdownSection from "./components/CountdownSection";
import PhotoGallery from "./components/PhotoGallery";
import Location from "./components/Location";
import DressCode from "./components/DressCode";
import BirthdayMenu from "./components/BirthdayMenu";
import BirthdayRSVP from "./components/BirthdayRSVP";
import Gifts from "./components/Gifts";
import Finale from "./components/Finale";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const openInvitation = () => {
    if (isOpen) return;

    setIsOpen(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.8;

      audioRef.current.play().catch((error) => {
        console.log("The song could not play:", error);
      });
    }
  };

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => {
          if (audioRef.current) {
            audioRef.current.muted = false;
          }

          setIsMuted(false);
        })
        .catch((error) => {
          console.log("The song could not play:", error);
        });

      return;
    }

    const nextMutedState = !isMuted;

    audioRef.current.muted = nextMutedState;
    setIsMuted(nextMutedState);
  };

  const scrollToAttendance = () => {
    document.getElementById("attendance")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="invitation-page">
      <audio
        ref={audioRef}
        src="/music/birthday-song.mp3"
        loop
        preload="auto"
      />

      <OpeningEnvelope
        isOpen={isOpen}
        onOpen={openInvitation}
      />

      <section
        className={`main-invitation ${
          isOpen ? "main-visible" : ""
        }`}
      >
        <BirthdayHero
          onConfirmAttendance={scrollToAttendance}
        />

        <BirthdayDetails />
<CountdownSection />
<PhotoGallery />
<Location />
<DressCode />
<BirthdayMenu />
<BirthdayRSVP />
<Gifts />
<Finale />
      </section>

      <AudioToggle
        isMuted={isMuted}
        onToggle={toggleSound}
      />
    </main>
  );
}