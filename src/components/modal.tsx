import React from "react";
import "./modal.scss";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export const Modal = ({ label, onClose, onRemoved }: any) => {
  const { width, height } = useWindowSize();
  return (
    <>

      <div className="card-content">
        <h2>🎉 {label} 🎉</h2>
        <div>
          <button className="removed" onClick={() => onRemoved(label, onClose)}>
            Remover
          </button>
          <button className="close" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </>
  );
};
