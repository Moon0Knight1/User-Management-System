import { useState } from "react";
import axios from "axios";

function UserForm() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                "http://localhost:3000/users",
                form
            );

            localStorage.setItem("token", res.data.token);

            setMessage("User Added Successfully");

        } catch (err) {

            setMessage(err.response.data.message);
        }
    };

    return (

        <form onSubmit={handleSubmit} className="form">

            <input
                type="text"
                name="name"
                placeholder="Enter Name"
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
            />

            <button>Add User</button>

            <p>{message}</p>

        </form>
    );
}

export default UserForm;