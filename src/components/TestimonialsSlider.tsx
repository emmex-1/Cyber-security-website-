import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Oladapo.",
    image: "/images/image1.jpeg",
    text: "BYTITUDE is one of a kind and they definitely know how to keep organizations data and assets secure.",
    rating: 5,
  },
  {
    name: "Sesan",
    image: "/images/image2.jpeg",
    text: " BYTITUDE keep to their promises and they provide excellent services. I will patronize them over and over again.",
    rating: 5,
  },
  {
    name: "Rodiat",
    image: "/images/image3.jpeg",
    text: "Their services are so professional and focused on satisfying their customers.",
    rating: 5,
  },
  {
    name: "Daniel",
    image: "/images/image4.jpeg",
    text: "The accountability changed everything.",
    rating: 5,
  },
];

export default function TestimonialsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const autoplayRef = useRef(null);

  const startAutoplay = () => {
    if (!emblaApi) return;
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  useEffect(() => {
    if (!emblaApi) return;
    startAutoplay();
    return () => stopAutoplay();
  }, [emblaApi]);

  const scrollPrev = () => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    startAutoplay(); // restart timer after manual click
  };

  const scrollNext = () => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    startAutoplay(); // restart timer after manual click
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Real People, Real Results
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Hear from families who transformed their financial lives.
          </p>
        </div>

        <div className="relative">

          {/* Left Arrow */}
          <button
            onClick={scrollPrev}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Slider */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] px-3"
                >
                  <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">

                    <div className="flex justify-center mb-4">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>

                    <div className="flex justify-center gap-1 mb-3">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star
                          key={j}
                          size={16}
                          className="text-yellow-500 fill-yellow-500"
                        />
                      ))}
                    </div>

                    <p className="text-gray-600 text-sm text-center italic mb-4 flex-grow">
                      "{t.text}"
                    </p>

                    <p className="text-center font-semibold text-gray-900">
                      {t.name}
                    </p>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollNext}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100"
          >
            <ChevronRight size={22} />
          </button>

        </div>
      </div>
    </section>
  );
}