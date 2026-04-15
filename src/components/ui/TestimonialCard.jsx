import { Star } from "lucide-react";

// avatarSize: "sm" | "lg"
export function TestimonialCard({ t, avatarSize = "lg" }) {
  const avatarCls =
    avatarSize === "lg"
      ? "w-12 h-12 sm:w-16 sm:h-16 xl:w-20 xl:h-20"
      : "w-12 h-12 sm:w-14 sm:h-14";

  const wrapperPl =
    avatarSize === "lg" ? "pl-0 sm:pl-9 xl:pl-11" : "pl-0 sm:pl-8";

  const cardPl =
    avatarSize === "lg" ? "pl-10 sm:pl-11 xl:pl-13" : "pl-9 sm:pl-10";

  return (
    <div className={`relative ${wrapperPl} h-full`}>
      {/* Card — fixed height so all cards are equal */}
      <div
        className="rounded-2xl pr-20 sm:pr-5 pt-7 pb-7 flex flex-col h-full bg-card border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        style={{
          paddingLeft: avatarSize === "lg" ? "1.25rem" : "1.25rem",
        }}
      >
        {/* Name + role */}
        <div className="mb-2">
          <div className="font-bold text-sm sm:text-base text-foreground leading-tight">
            {t.author}
          </div>
          <div className="text-[11px] sm:text-xs text-primary font-medium mt-0.5">
            {t.role}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-3" />

        {/* Quote — flex-1 so all cards stretch equally */}
        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed flex-1 mb-4">
          {t.quote}
        </p>

        {/* Stars — always at bottom */}
        <div className="flex gap-1 mt-auto">
          {Array.from({ length: 5 }).map((_, j) => (
            <Star
              key={j}
              size={13}
              className={
                j < (t.rating ?? 5)
                  ? "text-primary fill-primary"
                  : "text-muted-foreground/25 fill-transparent stroke-muted-foreground/25"
              }
            />
          ))}
        </div>
      </div>

      {/* Avatar — left edge, vertically centered */}
      <div
        className="absolute top-5 right-5 sm:right-auto sm:left-0 sm:top-1/2 sm:-translate-y-1/2"
        style={{ zIndex: 10 }}
      >
        <div
          className={`${avatarCls} rounded-full overflow-hidden shrink-0`}
          style={{
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.35), 0 0 0 3px hsl(var(--primary) / 0.28)",
          }}
        >
          {t.img ? (
            <img
              src={t.img}
              alt={t.author}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/45 to-accent/45 flex items-center justify-center text-white font-bold text-lg">
              {t.author?.[0]?.toUpperCase() ?? "?"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;



