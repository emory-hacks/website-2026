"use client";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#f4f9fc] flex flex-col items-center justify-center overflow-hidden py-20"
    >
      {/* Left Green Graphic Placeholder */}
      <div className="absolute left-[5%] md:left-[15%] top-[45%] w-[30vw] md:w-[15vw] h-[40vh] bg-[#9cc044]"></div>

      {/* Right Green Graphic Placeholder */}
      <div className="absolute right-[5%] md:right-[15%] top-[45%] w-[30vw] md:w-[15vw] h-[40vh] bg-[#9cc044]"></div>

      {/* Center Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center w-[90%] sm:w-[80%] md:w-[60%] lg:w-[45%]">
        {/* Title */}
        <h2
          className="text-5xl md:text-7xl text-black mb-8 z-20"
          style={{ fontFamily: "'Mochiy Pop One', sans-serif" }}
        >
          ABOUT
        </h2>

        <div className="bg-white/80 backdrop-blur-md rounded-[40px] p-8 md:p-12 shadow-xl border border-white/40">
          <p className="text-center text-lg md:text-xl leading-[2] text-gray-900 font-medium">
            Emory Hacks, presented by PROJECT Emory, is a hackathon hosted at
            Emory University. We are committed to bringing hundreds of students
            together for an intensive 36-hour hackathon where innovation comes
            to life. Whether you're a first-time coder or a seasoned developer
            come bond peers and industry professionals, and join us to push your
            creative and technical boundaries in this dynamic weekend of
            building and collaboration.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
