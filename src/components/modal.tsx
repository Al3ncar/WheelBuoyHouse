import "./modal.scss";

export const Modal = ({ label, onClose, onRemoved }: any) => {
  return (
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
  );
};
