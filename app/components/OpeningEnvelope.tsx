"use client";

type OpeningEnvelopeProps = {
  isOpen: boolean;
  onOpen: () => void;
};

export default function OpeningEnvelope({
  isOpen,
  onOpen,
}: OpeningEnvelopeProps) {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLElement>
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <section
      className={`opening-screen ${
        isOpen ? "opening-screen-hidden" : ""
      }`}
      onClick={onOpen}
      aria-label="Open invitation"
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="opening-content">
        <div className="envelope-scene">
          <div
            className={`envelope ${
              isOpen ? "envelope-open" : ""
            }`}
          >
            {/* Envelope base */}
            <div className="envelope-body">
              <div className="envelope-letter">
                <span>Our story begins...</span>
              </div>
            </div>

            {/* Bottom flap */}
            <div className="envelope-fold envelope-fold-bottom" />

            {/* Top flap */}
            <div className="envelope-flap">
              <div className="flap-inner" />
            </div>

            {/* Wax seal */}
            <div className="wax-seal">
              <div className="wax-seal-inner">
                <span className="seal-top">Capt</span>

                <span className="seal-name">
                  Zuuuuu
                </span>

                <span className="seal-star">
                  ✦
                </span>
              </div>
            </div>

            {/* Tap to open */}
            <div className="tap-to-open">
              <span className="tap-line" />

              <span className="tap-text">
                TAP TO OPEN
              </span>

              <span className="tap-line" />

              <span className="tap-star">
                ✦
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}