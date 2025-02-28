import Header from "./features/header/Header";
import List from "./features/list/List";
import CreateRoute from "./components/createRoute/CreateRoute";
import {useState} from "react";

function App() {
    const [isList, setIsList] = useState(false);
    const [routesList, setRoutesList] = useState([]);
    const [locationList, setLocationList] = useState([]);

    return (
    <div style={{ padding: "20px" }}>
        <Header setIsList={setIsList} isList={isList} setRoutesList={setRoutesList} setLocationList={setLocationList}/>
        {isList ? <List routesList={routesList}/> : "" }
        <CreateRoute dropDownData={locationList}/>
    </div>
  );
}

export default App;
