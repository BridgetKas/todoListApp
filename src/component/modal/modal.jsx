
import './modal.css';

const Modal = ({ show, onClose, children }) => {
  return (
    <div className={`modal ${show ? 'modal-show' : ''}`}>
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;