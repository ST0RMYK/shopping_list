import React, {useState} from "react";
import './CreateListForm.css'
import {AiFillFileAdd} from "react-icons/ai";


const CreateListForm = ({onAddList, lists}) => {

    function comingSoon() {
        alert("Coming soon!")
    }

    const [modalCreateVisible, setModalCreateVisible] = useState(false)

    function toggleModalCreate() {
        const modalCreateCss = document.getElementById('modal-createList')
        if (modalCreateVisible === false) {
            setModalCreateVisible(true)
            modalCreateCss.style.display = 'flex'
        } else if (modalCreateVisible === true) {
            setModalCreateVisible(false)
            modalCreateCss.style.display = 'none'
        }
    }


    return (<>
        <dialog id="modal-createList">
            <article className='createListDialog'>
                <h4><AiFillFileAdd id='addListIcon'/> Create new list</h4>
                <label>Name</label>
                <input type='text'/>
                <label>Description</label>
                <textarea id='longerInput'/>
                <footer>
                    <a href='#modalCreateCancel' role="button" className="secondary"
                       onClick={toggleModalCreate}>Cancel</a>
                    <a href="#modalCreateConfirm" role="button">Confirm</a>
                </footer>
            </article>
        </dialog>
        <button id='addListBtn' onClick={toggleModalCreate}><AiFillFileAdd id='addListIcon'/><b>Create new list</b>
        </button>
    </>)

}

export default CreateListForm