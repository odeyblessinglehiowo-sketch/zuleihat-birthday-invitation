"use client";

type AudioToggleProps = {
  isMuted: boolean;
  onToggle: () => void;
};

export default function AudioToggle({
  isMuted,
  onToggle,
}: AudioToggleProps) {
  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={onToggle}
      aria-label={isMuted ? "Enable sound" : "Disable sound"}
      title={isMuted ? "Enable sound" : "Disable sound"}
    >
      {isMuted ? "🔇" : "🔊"}
    </button>
  );
}