import React, { useState, useEffect } from 'react';

const InfoCard = () => {
    const [licenses, setLicenses] = useState([]);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        const fetchData = async () => {
            try {
                const response = await fetch('https://brta-server.onrender.com/api/licenses');
                const data = await response.json();
                setLicenses(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <>
            {licenses.map((license) => (
                <div key={license.id} className="card w-[320px] bg-base-100 shadow-md border border-gray-300">
                    <div className="card-body">
                        <h2 className="card-title">{license.name}</h2>
                        <p>Vehicle No: {license.vehicleNo}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-sm bg-blue-400">View Details</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default InfoCard;
