import {useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ imgLarge, alt, onClose }) => {
const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
    }
    },
    [onClose]
  );

    const handelBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return createPortal(
    <div className={s.overlay} onClick={handelBackdropClick}>
      <div className={s.modal}>
        <img src={imgLarge} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  imgLarge: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
