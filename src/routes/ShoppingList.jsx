import React, { useState, useEffect } from "react";
import './ShoppingList.css'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { BiSolidBookAdd } from 'react-icons/bi'
import { BsFillTrashFill, BsBagCheckFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import axios from "axios";
import mockUsers from "./mockData";

const ShoppingList = () => {
    const [users, setUsers] = useState(mockUsers);
    const [navShow, setNavShow] = useState(true);
    const [createModalShow, setCreateModalShow] = useState(false);
    const [newList, setNewList] = useState({ name: "", desc: "" });
    const [openedList, setOpenedList] = useState(null);
    const [editedList, setEditedList] = useState(null);
    const [item, setItem] = useState("");
    const [selectedUserIndex, setSelectedUserIndex] = useState(0);
    const [selectedUser, setSelectedUser] = useState({ lists: [] });
    

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get("/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Chyba při načítání dat ze serveru", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewList({ ...newList, [name]: value });
    };

    const addList = async () => {
        try {
            const response = await axios.post(
                `api/users/${selectedUser.id}/lists`,
                newList
            );
            const updatedUsers = [...users];
            updatedUsers[selectedUserIndex].lists = [...updatedUsers[selectedUserIndex].lists, response.data];
            setUsers(updatedUsers);
            setNewList({ name: "", desc: "", items: [] });
        } catch (error) {
            console.error("Chyba při vytváření seznamu", error);
        }
    };

    const deleteList = async (id) => {
        try {
            await axios.delete(`/api/lists/${id}`);
            const updatedLists = selectedUser.lists.filter((list) => list.id !== id);
            const updatedUsers = [...users];
            updatedUsers[selectedUserIndex].lists = updatedLists;
            setUsers(updatedUsers);
            if (openedList && openedList.id === id) {
                setOpenedList(null);
                setEditedList(null);
            }
        } catch (error) {
            console.error("Chyba při mazání seznamu", error);
        }
    };

    const openList = (id) => {
        const list = selectedUser.lists.find((b) => b.id === id);
        setOpenedList(list);
        setEditedList(null);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedList({ ...editedList, [name]: value });
    };

    const saveEditedList = async () => {
        try {
            const response = await axios.put(
                `/api/lists/${openedList.id}`,
                editedList
            );
            const updatedLists = selectedUser.lists.map((list) =>
                list.id === openedList.id ? response.data : list
            );
            const updatedUsers = [...users];
            updatedUsers[selectedUserIndex].lists = updatedLists;
            setUsers(updatedUsers);
            setOpenedList(response.data);
            setEditedList(null);
        } catch (error) {
            console.error("Chyba při aktualizaci seznamu", error);
        }
    };

    const handleItemChange = (e) => {
        setItem(e.target.value);
    };

    const addItem = async () => {
        try {
            const response = await axios.post(
                `/api/lists/${openedList.id}/items`,
                { item }
            );
            const updatedItems = [...openedList.items, response.data];
            const updatedLists = selectedUser.lists.map((list) =>
                list.id === openedList.id
                    ? { ...list, items: updatedItems }
                    : list
            );
            const updatedUsers = [...users];
            updatedUsers[selectedUserIndex].lists = updatedLists;
            setUsers(updatedUsers);
            setOpenedList({ ...openedList, items: updatedItems });
            setItem("");
        } catch (error) {
            console.error("Chyba při přidávání položky", error);
        }
    };

    const deleteItem = async (itemIndex) => {
        try {
            await axios.delete(`/api/items/${openedList.items[itemIndex].id}`);
            const updatedItems = openedList.items.filter(
                (item, index) => index !== itemIndex
            );
            const updatedLists = selectedUser.lists.map((list) =>
                list.id === openedList.id
                    ? { ...list, items: updatedItems }
                    : list
            );
            const updatedUsers = [...users];
            updatedUsers[selectedUserIndex].lists = updatedLists;
            setUsers(updatedUsers);
            setOpenedList({ ...openedList, items: updatedItems });
        } catch (error) {
            console.error("Chyba při mazání položky", error);
        }
    };

    function navigationShow() {
        setNavShow(!navShow);
    }

    function mobileNavigationHide() {
        if (window.innerWidth <= 728) {
            navigationShow();
        }
    }

    function createModalWindowShow() {
        setCreateModalShow(!createModalShow);
    }

    return (
        <>
            <div className='button-area'>
                <button className='menu-button' onClick={navigationShow}>
                    <GiHamburgerMenu size={22} className='hamburger-icon' />
                    <b>Nákupní seznamy</b>
                </button>
            </div>

            <dialog className="create-modal" style={{ display: createModalShow ? 'flex' : 'none' }}>
                <article className="add-list-dialog">
                    <h3><BiSolidBookAdd size={32} className='add-icon' /> Přidat nákupní seznam</h3>
                    <label>Název *</label>
                    <input
                        type="text"
                        name="name"
                        value={newList.name}
                        onChange={handleInputChange}
                    />
                    <label>Popisek *</label>
                    <textarea
                        className="text-area"
                        name="desc"
                        value={newList.desc}
                        onChange={handleInputChange}
                    />
                    <footer>
                        <a onClick={createModalWindowShow} href="#createListCancel" role="button" className="secondary">Zrušit</a>
                        <a href="#createListConfirm" role="button" onClick={() => {
                            addList();
                            createModalWindowShow();
                        }}>Vytvořit</a>
                    </footer>
                </article>
            </dialog>

            <div className='left-side-bar' style={{ display: navShow ? 'block' : 'none' }}>
                <IoCloseCircleSharp size={32} onClick={navigationShow} className='close-icon' />
                <h3>Nákupní seznamy</h3>
                <div className="user-switch">
                    <label>Uživatel:</label>
                    <select onChange={(e) => setSelectedUserIndex(e.target.value)}>
                        {users.map((user, index) => (
                            <option key={user.id} value={index}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <button onClick={createModalWindowShow}><BiSolidBookAdd size={22} className='add-icon' /> <b>Přidat seznam</b></button>
                <label>Seznamy</label>
                {selectedUser.lists.map((oneList) => (
                    <div key={oneList.id}>
                        <button onClick={() => {
                            openList(oneList.id);
                            mobileNavigationHide();
                        }} className='lists-button'>
                            <BsFillTrashFill onClick={() => deleteList(oneList.id)} className="trash-icon" /> {oneList.name}
                        </button>
                    </div>
                ))}
            </div>

            <div className='detail-view'>
                {openedList ? (
                    <div>
                        {editedList ? (
                            <div>
                                <h3>Režim úpravy</h3>
                                <div className="grid">
                                    <div>
                                        <label>Název</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedList.name}
                                            onChange={handleEditInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Popisek</label>
                                        <input
                                            type="text"
                                            name="desc"
                                            value={editedList.desc}
                                            onChange={handleEditInputChange}
                                        />
                                    </div>
                                </div>
                                <button onClick={saveEditedList}>Uložit změny</button>
                            </div>
                        ) : (
                            <div>
                                <hgroup>
                                    <h1>{openedList.name}</h1>
                                    <h4>{openedList.desc}</h4>
                                </hgroup>
                                {openedList.items && openedList.items.length > 0 ? (
                                    <ul className='item-area'>
                                        {openedList.items.map((item, index) => (
                                            <span key={index}>
                                                <BsBagCheckFill className='check-icon' size={24} onClick={() => deleteItem(index)} /> <span className='item'> {item} </span>
                                                <br />
                                            </span>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Přidejte první položku!</p>
                                )}
                                <div>
                                    <input
                                        type="text"
                                        value={item}
                                        placeholder="Začněte psát..."
                                        onChange={handleItemChange}
                                    />
                                    <button onClick={addItem}>Přidat položku</button>
                                    <button className='edit-button' onClick={() => setEditedList({ ...openedList })}><b>
                                        <AiFillEdit className='edit-icon' size={24} /> Upravit
                                    </b></button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="container">
                        <h4 className='tip-message'>Vyberte nějaký nákupní seznam pro jeho zobrazení!</h4>
                    </div>
                )}
            </div>
        </>
    );
}

export default ShoppingList;
