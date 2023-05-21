import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Voter/Voter.css';

const Wardlist = () => {
  const [wards, setWards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wardsPerPage] = useState(10); // Number of wards to display per page

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/wards/');
        setWards(response.data);
      } catch (error) {
        console.log('Error fetching wardlist:', error);
      }
    };

    fetchWards();
  }, []);

  // Get current wards
  const indexOfLastWard = currentPage * wardsPerPage;
  const indexOfFirstWard = indexOfLastWard - wardsPerPage;
  const currentWards = wards.slice(indexOfFirstWard, indexOfLastWard);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="limiter">
      <div className="container-login100">
        <table>
          <thead>
            <tr>
              <th>Ward ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Total Voters</th>
              <th>Registered Voters</th>
              <th>Voter Turnout</th>
            </tr>
          </thead>
          <tbody>
            {currentWards.map((ward) => (
              <tr key={ward.id}>
                <td>{ward.ward_id}</td>
                <td>{ward.name}</td>
                <td>{ward.location}</td>
                <td>{ward.total_voters}</td>
                <td>{ward.registered_voters}</td>
                <td>{ward.voter_turnout}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <nav aria-label="...">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
            </li>
            {Array.from({ length: Math.ceil(wards.length / wardsPerPage) }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === Math.ceil(wards.length / wardsPerPage) ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Wardlist;
