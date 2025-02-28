import React from 'react';
import { useState} from 'react';
import {Button, Input} from "@mui/material";
import  styles from "./CreateRouter.module.css";
import DropDown from "../dropDown/DropDown";
// import {dropDownData} from "../../mock";

const CreateRoute = ({dropDownData}) => {

    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [distance, setDistance] = useState(null);
    const [routeName, setRouteName] = useState("");

    const postRoute = async () => {
        try {
            const requestBody = {
                "name": routeName,
                "coordinates": {
                    "x": 1,
                    "y": 50
                }
            };

            const response = await fetch(
                `https://localhost:8443/navigator/route/add/${from.id}/${to.id}/${distance}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch route data');
            }

            const data = await response.json();
        } catch (error) {
            console.error('Error fetching route data:', error);
        }
    };


    return (
        <div className={styles.route}>
            <div className={styles.route_name}>
                <Input variant="outlined" placeholder="название сваги" onChange={(event) => setRouteName(event.target.value)} />
            </div>
            <div className={styles.route_destination}>
            <DropDown items={dropDownData} label={"откуда"} setItem={setFrom} onChange={setFrom} /> 
            <DropDown items={dropDownData} label={"куда"} setItem={setTo} onChange={setTo} />

            </div>
            <div className={styles.route_length}>
                <Input variant="solid " placeholder="расстояние сваги" onChange={(event) => setDistance(event.target.value)} />
                <Button className={styles.route_button}  variant="contained" onClick={postRoute}>Подтвердить</Button>
            </div>
        </div>
    );
};

export default CreateRoute;