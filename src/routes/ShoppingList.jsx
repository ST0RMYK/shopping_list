import React from 'react'
import './ShoppingList.css'
import {IoIosArrowBack} from 'react-icons/io'
import Lists from '../components/Lists'
import CreateListForm from "../components/CreateListForm";


const ShoppingList = () => {

    function comingSoon() {
        alert("Coming soon!")
    }


    return (<>


        <div className='leftSide'>
            <button id='navBack' onClick={comingSoon}><IoIosArrowBack/></button>
            <h1 id='companyName'>ShoppingList</h1>
            <CreateListForm />
            <div className='myLists'>
                <label>My lists</label>
                <Lists/>
            </div>
        </div>

    </>)
}

export default ShoppingList