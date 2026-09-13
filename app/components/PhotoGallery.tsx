"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

const galleryImages = [
  { src: "/images/glimpse-1.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-2.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-3.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-4.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-5.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-6.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-7.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-8.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-9.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-10.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-11.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-12.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-13.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-14.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-15.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-16.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-17.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-18.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-19.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-20.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-21.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-22.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-23.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-24.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-25.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-26.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-27.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-28.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-29.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-30.webp", alt: "A beautiful moment" },
  { src: "/images/glimpse-31.webp", alt: "A beautiful moment" },
];

export default function GlimpseOfMe() {
  const [selectedImage, setSelectedImage] = useState<number | null>(
    null
  );

  const duplicatedImages = [...galleryImages, ...galleryImages];

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const showPreviousImage = useCallback(() => {
    setSelectedImage((currentIndex) => {
      if (currentIndex === null) return null;

      return currentIndex === 0
        ? galleryImages.length - 1
        : currentIndex - 1;
    });
  }, []);

  const showNextImage = useCallback(() => {
    setSelectedImage((currentIndex) => {
      if (currentIndex === null) return null;

      return currentIndex === galleryImages.length - 1
        ? 0
        : currentIndex + 1;
    });
  }, []);

  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    selectedImage,
    closeLightbox,
    showPreviousImage,
    showNextImage,
  ]);

  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <>
      <section
        className="relative overflow-hidden bg-[#fffdf9] py-10 text-[#2a2a2a] sm:py-18"
        aria-labelledby="glimpse-title"
      >
        <div className="mx-auto mb-10 max-w-4xl px-5 text-center sm:mb-14">
          <p className="font-sans text-[0.95rem] uppercase tracking-[0.28em] text-black/55 sm:text-sm">
            My Moments
          </p>

          <h2
            id="glimpse-title"
            className="mt-3 font-serif text-[clamp(2.7rem,7vw,5rem)] italic leading-none tracking-[-0.055em]"
          >
            Glimpse of Me!
            <span aria-hidden="true">📸</span>
          </h2>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="glimpse-track flex w-max gap-4 sm:gap-5">
            {duplicatedImages.map((image, index) => {
              const originalImageIndex =
                index % galleryImages.length;

              const isDuplicate = index >= galleryImages.length;

              return (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  onClick={() =>
                    setSelectedImage(originalImageIndex)
                  }
                  aria-label={`Open image ${
                    originalImageIndex + 1
                  } in larger view`}
                  className="group relative h-[320px] w-[220px] shrink-0 overflow-hidden rounded-2xl bg-[#e8e4dd] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#b88a38] focus-visible:ring-offset-4 sm:h-[430px] sm:w-[285px] sm:rounded-[18px]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading="lazy"
                    quality={78}
                    sizes="(max-width: 640px) 220px, 285px"
                    className="object-cover  group-hover:scale-105 group-hover:grayscale-0"
                  />

                  <span
                    className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition duration-500 group-hover:bg-black/20 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <span className="rounded-full border border-white/70 bg-black/30 px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] backdrop-blur-sm">
                      View
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#fffdf9] to-transparent sm:w-28"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#fffdf9] to-transparent sm:w-28"
          aria-hidden="true"
        />
      </section>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close image preview"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-2xl text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
            aria-label="Previous image"
            className="absolute left-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-2xl text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
          >
            ‹
          </button>

          <div
            className="relative h-[75vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              fill
              sizes="100vw"
              quality={85}
              priority
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
            aria-label="Next image"
            className="absolute right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-2xl text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
          >
            ›
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/40 px-4 py-2 font-sans text-xs tracking-[0.2em] text-white/80 backdrop-blur-sm">
            {selectedImage + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  );
}