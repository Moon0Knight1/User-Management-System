import { useEffect, useState } from "react";
import axios from "axios";

function UserList() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:3000/users",
                {
                    headers: {
                        authorization: token
                    }
                }
            );

            setUsers(res.data);

        } catch (err) {

            setError("Failed To Load Users");

        } finally {

            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (

        <div>

            <h2>Users List</h2>

            {users.map((user) => (

                <div key={user.id} className="card">

                    <h3>{user.name}</h3>
                    <p>{user.email}</p>

                </div>
            ))}

        </div>
    );
}

export default UserList;