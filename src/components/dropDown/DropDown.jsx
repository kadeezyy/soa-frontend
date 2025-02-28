import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const DropDown = ({ items,label,defaultValue, setItem }) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue || null);

    const handleChange = (event) => {
        const selectedObject = items.find(item => item.id === event.target.value);
        setSelectedValue(selectedObject);
        setItem(selectedObject)
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="dynamic-select-label">{label}</InputLabel>
            <Select
                labelId="dynamic-select-label"
                id="dynamic-select"
                value={selectedValue ? selectedValue.id : ""}
                label="Select an option"
                onChange={handleChange}
                defaultValue={defaultValue}
            >
                {items.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default DropDown;
