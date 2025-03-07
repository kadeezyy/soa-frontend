import React, { useEffect, useState} from 'react';
import DropDown from "../../components/dropDown/DropDown";
import styles from "./Header.module.css";
import { Button } from "@mui/material";
import Filter from "../filter/Filter";
import Sort from "../sort/Sort";

const Header = ({ setIsList, isList, setRoutesList, setLocationList}) => {
    const [dropDownData, setDropDownData] = useState([]);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [chosenSortFields, setChosenSortFields] = useState([]);
    const [isFilterModal, setIsFilterModal] = useState(false);
    const [isSortModal, setIsSortModal] = useState(false);
    const [filters, setFilters] = useState({
        distance: { from: "", to: "" },
        routeName: { from: "", to: "" },
        xLocation: { from: "", to: "" },
        yLocation: { from: "", to: "" },
        zLocation: { from: "", to: "" },
    });
    const limit = 10;

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

    const fetchGetRoutesData = async (offset) => {
        try {
            const sortBy = chosenSortFields;
            const url = new URL(`https://localhost:8443/route-management-service-1/routes`);
            
            const filterParams = JSON.stringify({
                locationIdFrom: from?.id,
                locationIdTo: to?.id,
                distanceFrom: filters.distance.from !== "" ? Number(filters.distance.from) : undefined,
                distanceTo: filters.distance.to !== "" ? Number(filters.distance.to) : undefined,
                // minId: filters.distance.from !== "" ? Number(filters.distance.from) : undefined,
                // maxId: filters.distance.to !== "" ? Number(filters.distance.to) : undefined,
                name: filters.routeName.from !== "" ? filters.routeName.from : undefined,
                minX: filters.xLocation.from !== "" ? Number(filters.xLocation.from) : undefined,
                maxX: filters.xLocation.to !== "" ? Number(filters.xLocation.to) : undefined,
                minY: filters.yLocation.from !== "" ? Number(filters.yLocation.from) : undefined,
                maxY: filters.yLocation.to !== "" ? Number(filters.yLocation.to) : undefined,
                minZ: filters.zLocation.from !== "" ? Number(filters.zLocation.from) : undefined,
                maxZ: filters.zLocation.to !== "" ? Number(filters.zLocation.to) : undefined,
            });


            // Добавляем параметры сортировки и фильтрации
            sortBy.forEach((field) => {
                url.searchParams.append('sortBy', field);
            });
            url.searchParams.append('limit', limit);
            url.searchParams.append('offset', offset);

            const response = await fetch(
                url,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: filterParams
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch route data');
            }

            const data = await response.json();
            console.log(data)
            setRoutesList(data)
            setIsList(true);
        } catch (error) {
            console.error('Error fetching route data:', error);
        }
    };

    const sortFields = [
        { value: "Name", name: "Name" , id: "Name"},
        { value: "CreationDate", name: "CreationDate", id: "CreationDate" },
        { value: "From", name: "LocationFrom", id: "From" },
        { value: "To", name: "LocationTo", id: "To" },
        { value: "Distance", name: "Distance", id: "Distance" },
    ];

    const handleClick = async () => {
        await fetchGetRoutesData(0);
        setIsList(true);
    };

    const handleFilterClick = () => {
        setIsFilterModal(true)
    }

    const handleSortClick = () => {
        setIsSortModal(true)
    }

    return (
        // <div className={styles.container}>
        //     <DropDown items={dropDownData} label={"Откуда"} setItem={setFrom} onChange={setFrom} />
        //     <DropDown items={dropDownData} label={"Куда"} setItem={setTo} onChange={setTo} />
        //     <DropDown items={closestDropDownData} label={"Ближайший/Дальший"} setItem={setClosest} onChange={setClosest} />
        //     <DropDown items={sortFields} label={"Сортировка"} setItem={setSortField} onChange={setSortField} />

        //     <Button
        //         variant="outlined"
        //         onClick={handleClick}
        //     >
        //         Поиск
        //     </Button>
        // </div>
        
        <div className={styles.container}>
            <div className={styles.dropWrapper}>
                <DropDown items={dropDownData} label={"откуда"} setItem={setFrom} onChange={setFrom} />
                <DropDown items={dropDownData} label={"куда"} setItem={setTo} onChange={setTo} />
            </div>
            <div className={styles.filterButtons}>
                <Button
                    variant="outlined"
                    onClick={handleFilterClick}
                    style={{height:"56px"}}
                >
                    Фильтрация
                </Button>

                <Button
                    variant="outlined"
                    onClick={handleSortClick}
                    style={{height:"56px"}}
                >
                    Сортировка
                </Button>
            </div>
            <Button
                variant="contained"
                onClick={handleClick}
            >
                Поиск
            </Button>

            <Filter setFilters={setFilters} isFilterModal={isFilterModal} setIsFilterModal={setIsFilterModal} />
            <Sort setChosenSortFields={setChosenSortFields} sortFields={sortFields} isSortModal={isSortModal} setIsSortModal={setIsSortModal} />
        </div>

    );
};

export default Header;
