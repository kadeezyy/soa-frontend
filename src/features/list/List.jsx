import React, {useState} from 'react';
import ListItem from "./listItem/ListItem";
import styles from "./List.module.css";
import Modal from "../../components/modal/Modal";

const List = ({routesList}) => {
    const [isModal,setIsModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null);


    return (
        <div className={styles.container}>
            {routesList.map((item, i) => (
                <ListItem key={i} item={item} setIsModal={setIsModal} setSelectedItem={setSelectedItem}  />
            ))}

            {/* {
                (<ListItem key={route.id} item={route} setIsModal={setIsModal} setSelectedItem={setSelectedItem}  />
            )} */}
            <Modal setIsModal={setIsModal} isModal={isModal} selectedItem={selectedItem}/>
        </div>
    );
};


export default List;
