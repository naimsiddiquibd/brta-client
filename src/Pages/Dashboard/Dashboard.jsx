import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const Dashboard = () => {
    const [licenses, setLicenses] = useState([]);
    const { user } = useContext(AuthContext);
    const email = user.email;

    useEffect(() => {
        // Fetch data from the API when the component mounts
        const fetchData = async () => {
            try {
                const response = await fetch(`https://brta-server.onrender.com/api/licenses/${encodeURIComponent(email)}`);
                const data = await response.json();
                setLicenses(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <div className='h-screen'>
            <div className='flex justify-center'>
            <div className="grid lg:grid-cols-3 lg:gap-3 lg:my-5 my-2">
                {licenses.map((license) => (
                    <div key={license.id} className="card w-96 bg-base-100 shadow-md">
                        <div className="card-body">
                            <h2 className="card-title">{license.name}</h2>
                            <p>Vehicle No: {license.vehicleNo}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
