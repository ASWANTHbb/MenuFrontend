import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SERVER_URL } from "../api/ServerUrl"; // Ensure correct path
import Footer from "../components/Footer";

const regexPatterns = {
  name: /^[A-Za-z0-9\s]+$/,
  price: /^\d+(\.\d{1,2})?$/,
  description: /^.+$/,
  image: /^(https?:\/\/[^\s]+)$/i  // Allow any valid URL format
};

function AddMenu() {
  const [menu, setMenu] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "" // Image URL field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu({ ...menu, [name]: value });
  };

  const validateForm = () => {
    for (const key in menu) {
      if (key !== "category" && regexPatterns[key] && !regexPatterns[key].test(menu[key])) {
        toast.error(`Invalid value for ${key}`);
        return false;
      }
    }

    if (!menu.category) {
      toast.error("Please select a category");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(`${SERVER_URL}/menus`, menu, {
        headers: {
          "Content-Type": "application/json"  // Ensure JSON content type
        }
      });

      toast.success("Menu created successfully!");
      setMenu({ name: "", price: "", description: "", category: "", image: "" }); // Reset form
      console.log(response);
    } catch (error) {
      console.error("Error adding menu:", error);
      toast.error(error.response?.data?.message || "Failed to create menu");
    }
  };

  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "black" }}>
        <h1 className="text-center" style={{ color: "#0796EF" }}>ADD NEW MENU</h1>
        <div className="row d-flex mt-5">
          <div className="col-lg-3"></div>
          <div className="col-lg-6 border p-3 rounded shadow" style={{ border: "1px solid #0796EF", background: "transparent" }}>
            <Form>
              {/* Menu Name */}
              <Form.Group className="mb-3">
                <Form.Label className="text-primary">Menu Name :</Form.Label>
                <Form.Control
                  className="border rounded p-3 text-primary"
                  type="text"
                  placeholder="Enter menu name"
                  value={menu.name}
                  name="name"
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Price */}
              <Form.Group className="mb-3">
                <Form.Label className="text-primary">Price :</Form.Label>
                <Form.Control
                  className="border rounded p-3 text-primary"
                  type="text"
                  placeholder="Enter price (e.g., 12.50)"
                  value={menu.price}
                  name="price"
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Description */}
              <Form.Group className="mb-3">
                <Form.Label className="text-primary">Description :</Form.Label>
                <Form.Control
                  className="border rounded p-3 text-primary"
                  type="text"
                  placeholder="Enter description"
                  value={menu.description}
                  name="description"
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Image Link */}
              <Form.Group className="mb-3">
                <Form.Label className="text-primary">Image Link :</Form.Label>
                <Form.Control
                  className="border rounded p-3 text-primary"
                  type="text"
                  placeholder="Enter image URL (e.g., https://example.com/image)"
                  value={menu.image}
                  name="image"
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Category Dropdown */}
              <Form.Group className="mb-3">
                <Form.Label className="text-primary">Category :</Form.Label>
                <Form.Select
                  className="border rounded p-3 text-primary"
                  name="category"
                  value={menu.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="food">Food</option>
                  <option value="drink">Drink</option>
                  <option value="brunch">Brunch</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-evenly">
                <button className="btn" style={{ backgroundColor: "#0796EF", color: "white" }} type="button" onClick={handleSubmit}>Create Menu</button>
                <button className="btn" style={{ backgroundColor: "#0796EF", color: "white" }} type="button" onClick={() => setMenu({ name: "", price: "", description: "", category: "", image: "" })}>Cancel</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default AddMenu;
