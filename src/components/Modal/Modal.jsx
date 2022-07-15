import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ imgLarge, alt, onClose }) => {
  const handelKeydown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const handelBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handelKeydown);
    return () => {
      document.removeEventListener('keydown', handelKeydown);
    };
  }, []);

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
