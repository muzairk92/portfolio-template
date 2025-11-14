import LottieOrbit from "lottie-react";
import orbitAnimation from "@animations/orbit.json";

const LottieBadge = () => {
  return (
    <div className="flex items-center gap-4 rounded-full border border-faint px-4 py-3">
      <LottieOrbit animationData={orbitAnimation} size={64} className="drop-shadow" speed={1.4} />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em]">Since 2014</p>
        <p className="text-sm text-body">10+ years in product and creative leadership</p>
      </div>
    </div>
  );
};

export default LottieBadge;
