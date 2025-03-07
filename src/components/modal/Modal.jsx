import React from 'react';
import styles from './Modal.module.css';
import { Button } from "@mui/material";

const Modal = ({ setIsModal, isModal, selectedItem, handleDelete }) => {
    return (
        isModal && (
            <div className={styles.modalBackdrop} onClick={() => setIsModal(false)}>
                <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                    <h2>{selectedItem.name}</h2>
                    <p><strong>Дистанция:</strong> {selectedItem.distance}</p>
                    <p><strong>Откуда:</strong> {selectedItem.from.name}</p>
                    <p><strong>Куда:</strong> {selectedItem.to.name}</p>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsModal(false)}
                    >
                        Закрыть
                    </Button>
                    <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDelete(selectedItem.id)}
                        >
                            Удалить
                        </Button>
                </div>
            </div>
        )
    );
};

export default Modal;
