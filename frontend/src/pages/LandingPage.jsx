import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

function LandingPage() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Slide in text & buttons
    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" },
    );

    // Slide in buttons
    gsap.fromTo(
      buttonsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power3.out" },
    );

    // Logo fade in
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" },
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center relative px-6 text-center"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1519608487953-e999c86e7455)`,
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Uber Logo */}
      <img
        ref={logoRef}
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
        className="w-24 absolute top-6 left-6 z-10"
      />

      {/* Content Section */}
      <div ref={textRef} className="relative z-10 text-white">
        <h1 className="text-5xl font-extrabold mb-4">Your Ride, Your Way</h1>
        <p className="text-lg text-gray-300 max-w-md mx-auto">
          Get where you need to go with safety and reliability, anytime,
          anywhere.
        </p>

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/login"
            className="bg-white text-black font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
          <Link
            to="/driver-login"
            className="bg-transparent border border-white text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-white hover:text-black transition"
          >
            Drive with Uber
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
