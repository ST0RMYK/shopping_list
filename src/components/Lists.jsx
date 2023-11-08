import React from "react";
import './Lists.css'

const Lists = () => {

    const lists = [
        {
            id: 1,
            name: "Example shopping list",
            description: "Some desc"
        },
        {
            id: 2,
            name: "Another shopping list",
            description: "Some another desc"
        },
    ]


    return (<>

        {lists.map((list) => (

            <div key={list.id}>
                <button className='listBtn'>
                    {list.name}
                </button>
            </div>
        ))}

    </>)
}

export default Lists