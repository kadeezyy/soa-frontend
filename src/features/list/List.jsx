import React, {useState, useEffect} from 'react';
import ListItem from "./listItem/ListItem";
import styles from "./List.module.css";
import Modal from "../../components/modal/Modal";
import fetchGetRoutesData from '../header/Header'

const List = ({ routesListPagination}) => {
    const [isModal,setIsModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [routes, setRoutes] = useState(routesListPagination.routes);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        setRoutes(routesListPagination.routes); // Обновляем routes, когда routesList изменяется
    }, [routesListPagination]); 

    const handlePagination = (page) => {
        fetchGetRoutesData(page * routesListPagination.limit)
        setCurrentPage(page)
    }


    const handleSort = (key) => {
    };

    const fetchDeleteRoute = async (routeId) => {
        try {
            const response = await fetch(`https://localhost:8443/route-management-service-1/routes/${routeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (!response.ok) {
                throw new Error('Failed to fetch dropdown data');
            }
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    }

    const renderSortIndicator = (key) => (
        <span className={styles.sortIndicator} style={{ visibility: sortConfig.key === key ? 'visible' : 'hidden' }}>
            {sortConfig.key === key ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '▲'}
        </span>
    );

    const handleRowClick = (item) => {
        setSelectedItem(item);
        setIsModal(true);
    };

    const handleDelete = () => {
        if (selectedItem) {
            setRoutes(routes.filter(route => route.id !== selectedItem.id));
            fetchDeleteRoute(selectedItem.id)
            setSelectedItem(null);
            setIsModal(false);
        }
    };

    const totalPages = Math.trunc(routesListPagination.total / routesListPagination.limit) + 1;

    return (
        <div className={styles.container}>
            {/* {routesList.map((item, i) => (
                <ListItem key={i} item={item} setIsModal={setIsModal} setSelectedItem={setSelectedItem}  />
            ))}


            <Modal setIsModal={setIsModal} isModal={isModal} selectedItem={selectedItem}/> */}
            <div className={styles.container}>
            <div className={styles.listHeader}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('id')}>ID {renderSortIndicator('id')}</th>
                            <th onClick={() => handleSort('name')}>Название {renderSortIndicator('name')}</th>
                            <th onClick={() => handleSort('from')}>Откуда {renderSortIndicator('from')}</th>
                            <th onClick={() => handleSort('to')}>Куда {renderSortIndicator('to')}</th>
                            <th onClick={() => handleSort('length')}>Дистанция {renderSortIndicator('length')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routes.map((item, i) => (
                            <tr key={i} onClick={() => handleRowClick(item)} className={styles.clickableRow}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.from.name || "Не указано"}</td>
                                <td>{item.to.name || "Не указано"}</td>
                                <td>{item.distance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagination}>
                <span>Страница {currentPage} из {totalPages}</span>
                <div className={styles.paginationBtnWrapper}>
                    <button disabled={currentPage === 1} onClick={() => handlePagination(currentPage - 1)}>Назад</button>
                    <button onClick={() => handlePagination(currentPage + 1)}>Вперёд
                    </button>
                </div>
            </div>
            <Modal setIsModal={setIsModal} isModal={isModal} selectedItem={selectedItem} handleDelete={handleDelete}/>
        </div>
        </div>
    );
};


export default List;
