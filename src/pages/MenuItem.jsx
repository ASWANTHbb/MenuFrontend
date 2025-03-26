import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SERVER_URL } from "../api/ServerUrl";
import Header from '../components/Header';
import Footer from '../components/Footer';

function MenuItems() {
    const { id } = useParams();
    const [menu, setMenu] = useState({});
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: "",
        description: "",
        price: ""
    });

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await fetch(`${SERVER_URL}/menus/${id}`);
            const data = await response.json();
            if (data.success) {
                setMenu(data.menu);
                setItems(data.items);
            }
        };
        fetchMenu();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const addItem = async () => {
        const response = await fetch(`${SERVER_URL}/menus/${id}/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        });

        const data = await response.json();
        if (data.success) {
            setItems([...items, data.item]);
            setNewItem({ name: "", description: "", price: "" });
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h1>{menu.name} Items</h1>
                <p>{menu.description}</p>

                <h3>Add New Item</h3>
                <div className="d-flex gap-2">
                    <input type="text" placeholder="Name" name="name" value={newItem.name} onChange={handleChange} />
                    <input type="text" placeholder="Description" name="description" value={newItem.description} onChange={handleChange} />
                    <input type="number" placeholder="Price" name="price" value={newItem.price} onChange={handleChange} />
                    <button onClick={addItem}>Add Item</button>
                </div>

                <h3>Items List</h3>
                {items.map(item => (
                    <div key={item._id}>
                        <h4>{item.name} - ₹{item.price}</h4>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default MenuItems;
