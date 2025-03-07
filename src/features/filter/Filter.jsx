import React, { useState } from 'react';
import DefaultModal from "../../components/defaultModal/DefaultModal";
import { Button, Input } from "@mui/material";
import styles from "./Filter.module.css";

const Filter = ({ setIsFilterModal, isFilterModal, setFilters }) => {
    const [distance, setDistance] = useState({ from: "", to: "" });
    const [routeName, setRouteName] = useState({ from: "", to: "" });
    const [xLocation, setXLocation] = useState({ from: "", to: "" });
    const [yLocation, setYLocation] = useState({ from: "", to: "" });
    const [zLocation, setZLocation] = useState({ from: "", to: "" });

    const handleInputChange = (field, key, value, setter) => {
        setter((prev) => ({ ...prev, [key]: value }));
        setFilters((prev) => ({
            ...prev,
            [field]: { ...prev[field], [key]: value },
        }));
    };

    // Обработчик для сохранения выбранных параметров сортировки
    const handleSave = () => {
        // Формируем массив sortBy на основе выбранных параметров
        setIsFilterModal(false); // Закрываем модальное окно
    };

    return (
        isFilterModal && (
            <DefaultModal>
                <div className={styles.wrapper}>
                    <span>Дистанция:</span>
                    <div className={styles.inputWrapper}>
                        <Input
                            variant="outlined"
                            placeholder="от"
                            value={distance.from}
                            onChange={(e) =>
                                handleInputChange("distance", "from", e.target.value, setDistance)
                            }
                            style={{ marginRight: "20px" }}
                        />
                        <Input
                            variant="outlined"
                            placeholder="до"
                            value={distance.to}
                            onChange={(e) =>
                                handleInputChange("distance", "to", e.target.value, setDistance)
                            }
                        />
                    </div>
                </div>

                <div className={styles.wrapper}>
                    <span>Название маршрута:</span>
                    <div className={styles.inputWrapper}>
                        <Input
                            variant="outlined"
                            placeholder="от"
                            value={routeName.from}
                            onChange={(e) =>
                                handleInputChange("routeName", "from", e.target.value, setRouteName)
                            }
                            style={{ marginRight: "20px" }}
                        />
                        <Input
                            variant="outlined"
                            placeholder="до"
                            value={routeName.to}
                            onChange={(e) =>
                                handleInputChange("routeName", "to", e.target.value, setRouteName)
                            }
                        />
                    </div>
                </div>

                <div className={styles.wrapper}>
                    <span>Координата X:</span>
                    <div className={styles.inputWrapper}>
                        <Input
                            variant="outlined"
                            placeholder="от"
                            value={xLocation.from}
                            onChange={(e) =>
                                handleInputChange("xLocation", "from", e.target.value, setXLocation)
                            }
                            style={{ marginRight: "20px" }}
                        />
                        <Input
                            variant="outlined"
                            placeholder="до"
                            value={xLocation.to}
                            onChange={(e) =>
                                handleInputChange("xLocation", "to", e.target.value, setXLocation)
                            }
                        />
                    </div>
                </div>

                <div className={styles.wrapper}>
                    <span>Координата Y:</span>
                    <div className={styles.inputWrapper}>
                        <Input
                            variant="outlined"
                            placeholder="от"
                            value={yLocation.from}
                            onChange={(e) =>
                                handleInputChange("yLocation", "from", e.target.value, setYLocation)
                            }
                            style={{ marginRight: "20px" }}
                        />
                        <Input
                            variant="outlined"
                            placeholder="до"
                            value={yLocation.to}
                            onChange={(e) =>
                                handleInputChange("yLocation", "to", e.target.value, setYLocation)
                            }
                        />
                    </div>
                </div>

                <div className={styles.wrapper}>
                    <span>Координата Z:</span>
                    <div className={styles.inputWrapper}>
                        <Input
                            variant="outlined"
                            placeholder="от"
                            value={zLocation.from}
                            onChange={(e) =>
                                handleInputChange("zLocation", "from", e.target.value, setZLocation)
                            }
                            style={{ marginRight: "20px" }}
                        />
                        <Input
                            variant="outlined"
                            placeholder="до"
                            value={zLocation.to}
                            onChange={(e) =>
                                handleInputChange("zLocation", "to", e.target.value, setZLocation)
                            }
                        />
                    </div>
                </div>

                <Button onClick={handleSave} variant="contained">
                    сохранить
                </Button>
            </DefaultModal>
        )
    );
};

export default Filter;