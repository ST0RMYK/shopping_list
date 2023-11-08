import React from "react";
import {Routes, Route} from 'react-router-dom'
import ShoppingList from "./routes/ShoppingList";

const App = () => {
    return (<>
        <Routes>
            <Route path='/' element={<ShoppingList />} />
            <Route path='*' element={<ShoppingList />} />
        </Routes>
    </>)
}

export default App