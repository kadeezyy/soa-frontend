import React, { ReactNode } from 'react';
import styles from './DefaultModal.module.css';


const DefaultModal = ({ children  }) => {
    return (
          <div className={styles.modalBackdrop}>
            <div className={styles.modalContainer}>
                {children}
            </div>
        </div>
    );
};

export default DefaultModal;
