import React, { useState } from 'react';
import DefaultModal from "../../components/defaultModal/DefaultModal";
import { Button } from "@mui/material";
import styles from "./Sort.module.css";

const Sort = ({ setChosenSortFields, sortFields, isSortModal, setIsSortModal }) => {
    const [sortOrder, setSortOrder] =  useState(null);
    const [NameOrder, setNameOrder] =  useState(null);
    const [sortOrders, setSortOrders] = useState({});


    // Обработчик для установки порядка сортировки
    const handleSortOrderChange = (fieldId, order) => {
        setSortOrders((prev) => ({
            ...prev,
            [fieldId]: order,
        }));
    };

    // Обработчик для сохранения выбранных параметров сортировки
    const handleSave = () => {
        // Формируем массив sortBy на основе выбранных параметров
        const sortBy = Object.entries(sortOrders)
            .filter(([_, order]) => order !== null) // Исключаем поля без выбранного порядка
            .map(([fieldId, order]) => (order === 'ascending' ? fieldId : `-${fieldId}`));
        setChosenSortFields(sortBy)
        console.log('Selected sortBy:', sortBy); // Логируем результат
        setIsSortModal(false); // Закрываем модальное окно
    };

    return (
        isSortModal && (
            <DefaultModal>
                <div className={styles.container}>
                    {sortFields.map((field) => (
                        <div key={field.id} className={styles.wrapper}>
                            <span>{field.name}:</span>
                            <div className={styles.buttons}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleSortOrderChange(field.id, 'ascending')}
                                >
                                    Ascending
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => handleSortOrderChange(field.id, 'descending')}
                                >
                                    Descending
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                <Button variant="contained" onClick={handleSave}>
                    Сохранить
                </Button>
            </DefaultModal>
        )
    );
};

export default Sort;
