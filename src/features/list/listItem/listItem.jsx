import React from 'react';
import styles from "./ListItem.module.css";
const ListItem = ({item,setIsModal,setSelectedItem}) => {

    const clickHandler = (item) => {
        setIsModal(true)
        setSelectedItem(item)
    }


    return (

        <button className={styles.container} onClick={()=> clickHandler(item)}>
            {item.name}
        </button>
    );
};

export default ListItem;