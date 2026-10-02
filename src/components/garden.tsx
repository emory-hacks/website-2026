// Small hand-drawn garden bits shared across sections

// A leaf and a little five-petal flower
const SIZE = "size-6 md:size-7";

export const Leaf = ({
  flip = false,
  className = SIZE,
}: {
  flip?: boolean;
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    style={{
      transform: `rotate(${flip ? 40 : -40}deg) scaleX(${flip ? -1 : 1})`,
    }}
    aria-hidden
  >
    <path
      d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16Z"
      fill="#a8d05a"
      stroke="#6f9f35"
      strokeWidth="1.5"
    />
    <path d="M5 19 17 7" stroke="#6f9f35" strokeWidth="1.3" />
  </svg>
);

export const Blossom = ({ className = SIZE }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    {[0, 72, 144, 216, 288].map((r) => (
      <ellipse
        key={r}
        cx="12"
        cy="6.5"
        rx="4"
        ry="5"
        fill="#f4a3b4"
        transform={`rotate(${r} 12 12)`}
      />
    ))}
    <circle cx="12" cy="12" r="3.2" fill="#ffd66b" />
  </svg>
);
