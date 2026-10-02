// Soft cream haze behind text that sits straight on the sky, so it stays
// readable over clouds without a hard card edge. Place inside a relative box.
// Drawn as a radial gradient rather than a blur filter: same look, but far
// cheaper to paint and scroll on phones.
const SkyGlow = ({ opacity = 0.35 }: { opacity?: number }) => (
  <div
    className="pointer-events-none absolute -inset-x-[20%] -inset-y-[22%]"
    style={{
      opacity,
      background:
        "radial-gradient(closest-side, #fffbe3 0%, #fffbe3 45%, rgb(255 251 227 / 0) 100%)",
    }}
    aria-hidden
  />
);

export default SkyGlow;
