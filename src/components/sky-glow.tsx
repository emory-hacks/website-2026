// Soft cream haze behind text that sits straight on the sky, so it stays
// readable over clouds without a hard card edge. Place inside a relative box.
const SkyGlow = ({ opacity = 0.35 }: { opacity?: number }) => (
  <div
    className="pointer-events-none absolute -inset-x-[10%] -inset-y-[8%] rounded-[50%] bg-[#fffbe3] blur-3xl"
    style={{ opacity }}
    aria-hidden
  />
);

export default SkyGlow;
