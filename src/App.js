import Header from "./features/header/Header";
import List from "./features/list/List";
import CreateRoute from "./components/createRoute/CreateRoute";
import {useState} from "react";

function App() {
    const [isList, setIsList] = useState(false);
    const [routesListPagination, setRoutesList] = useState();
    const [locationList, setLocationList] = useState([]);

    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [chosenSortFields, setChosenSortFields] = useState([]);
     const [filters, setFilters] = useState({
         distance: { from: "", to: "" },
         routeName: { from: "", to: "" },
         xLocation: { from: "", to: "" },
         yLocation: { from: "", to: "" },
         zLocation: { from: "", to: "" },
     });

    return (
    <div style={{ padding: "20px" }}>
        <Header from={from} setFrom={setFrom} to={to} setTo={setTo} chosenSortFields={chosenSortFields} setChosenSortFields={setChosenSortFields} filters={filters} setFilters={setFilters} setIsList={setIsList} isList={isList} setRoutesList={setRoutesList} setLocationList={setLocationList}/>
        {isList ? <List from={from} setFrom={setFrom} to={to} setTo={setTo} chosenSortFields={chosenSortFields} setChosenSortFields={setChosenSortFields} filters={filters} setFilters={setFilters} routesListPagination={routesListPagination} setIsList={setIsList} setRoutesList={setRoutesList}/> : "" }
        <CreateRoute dropDownData={locationList}/>
    </div>
  );
}

export default App;
