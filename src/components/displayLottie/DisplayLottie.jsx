import React, {useEffect, useState} from "react";
import Lottie from "lottie-react";

export default function DisplayLottie({animationData}) {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);
  return (
    <Lottie
      key={String(reducedMotion)}
      animationData={animationData}
      loop={!reducedMotion}
      autoplay={!reducedMotion}
      aria-hidden="true"
    />
  );
}
