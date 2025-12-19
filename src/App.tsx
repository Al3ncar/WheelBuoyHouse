import { useEffect, useRef, useState } from "react";
import SpinWheel from "ts-spin-wheel";
import type { SpinWheelHandle } from "ts-spin-wheel";

import { wheelData } from "./data/data";
import { Modal } from "./components/modal";
import Confetti from "react-confetti";
import Aud from "./assets/audio.mp3";
import IBoiaHouse from "./assets/logo_casa.jpg";
import "./style.scss";
// ... (mantenha os imports e o wheelData)

const App = () => {
  const [dataWheel, setDataWheel] = useState(wheelData);
  const [party, setParty] = useState(false);
  const wheelRef = useRef<SpinWheelHandle>(null);
  const audioRef = useRef<any | null>(null);

  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const triggerSpin = () => {
    if (wheelRef.current) {
      wheelRef.current.spin();
      audioRef.current.play();
      audioRef.current.currentTime = 4;
    }
  };

  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, []);

  const removePersonByLabel = (label: string, onClose: () => void) => {
    setDataWheel((prev) => prev.filter((item) => item.label !== label));
    onClose();
  };

  return (
    <div className="wheel-container">
      {party && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={1000}
          gravity={0.2}
        />
      )}
      <div className="wheel-stage">
        <div className="side-indicator" onClick={() => triggerSpin()}></div>

        <div className="wheel-wrapper">
          <div className="center-logo-overlay" onClick={() => triggerSpin()}>
            <img src={IBoiaHouse} alt="Logo casa da boia" />
          </div>

          <SpinWheel
            ref={wheelRef}
            sectors={dataWheel}
            size={800}
            onSpinEnd={() => setParty(true)}
            labelFontSize={24}
            spinButtonText=""
            enableSound={false}
            spinButtonStyles={{ display: "none" }}
            customModalContent={(winner, onClose) => (
              <Modal
                label={winner.label}
                onClose={() => {
                  setParty(false);
                  onClose();
                }}
                onRemoved={removePersonByLabel}
              />
            )}
          />
          <audio ref={audioRef} src={Aud} />
        </div>
      </div>
    </div>
  );
};

export default App;
