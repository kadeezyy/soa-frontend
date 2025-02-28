import React, { useEffect, useState} from 'react';
import DropDown from "../../components/dropDown/DropDown";
import styles from "./Header.module.css";
import { Button } from "@mui/material";

const Header = ({ setIsList, isList, setRoutesList, setLocationList}) => {
    const [dropDownData, setDropDownData] = useState([]);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [closest, setClosest] = useState(true);

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const response = await fetch('https://localhost:8443/navigator/locations?limit=10&offset=0', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch dropdown data');
                }
                const data = await response.json();
                setDropDownData(data.locations);
                setLocationList(data.locations)
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchDropdownData();
    }, []); // Empty dependency array ensures this runs only once on mount

    const fetchGetRoutesData = async () => {
        try {
            const response = await fetch(
                `https://localhost:8443/navigator/route/${from.id}/${to.id}/true`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch route data');
            }

            const data = await response.json();
            setRoutesList(data.routes)
            setIsList(true);
        } catch (error) {
            console.error('Error fetching route data:', error);
        }
    };


    const closestDropDownData = [
        { value: true, name: "ближайший" },
        { value: false, name: "дальший" },
    ];

    const handleClick = () => {
        fetchGetRoutesData();
        setIsList(!isList);
    };

    const isDisabled = !(from && to && closest !== null); //исправить потом ))


    return (
        <div className={styles.container}>
            <DropDown items={dropDownData} label={"откуда"} setItem={setFrom} onChange={setFrom} />
            <DropDown items={dropDownData} label={"куда"} setItem={setTo} onChange={setTo} />
            <DropDown items={closestDropDownData} label={"ближайший/дальший"} setItem={setClosest} onChange={setClosest} />
            <Button
                variant="outlined"
                onClick={handleClick}
            >
                Поиск
            </Button>
        </div>
    );
};

export default Header;
