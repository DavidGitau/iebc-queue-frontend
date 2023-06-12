import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffList = () => {
  const [voters, setVoters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [votersPerPage] = useState(10); // Number of voters to display per page

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await axios.get(`http://${window.location.hostname}:8000/api/staffs/`);
        setVoters(response.data);
      } catch (error) {
        console.log('Error fetching voters:', error);
      }
    };

    fetchVoters();
  }, []);

  // Get current voters
  const indexOfLastVoter = currentPage * votersPerPage;
  const indexOfFirstVoter = indexOfLastVoter - votersPerPage;
  const currentVoters = voters.slice(indexOfFirstVoter, indexOfLastVoter);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="limiter">
      <div className="container-login100">
        <table>
          <thead>
            <tr>
              <th>Staff ID</th>
              <th>N ID</th>
              <th>Name</th>
              <th>D.O.B</th>
              <th>Center</th>
            </tr>
          </thead>
          <tbody>
            {currentVoters.map((staff) => (
              <tr key={staff.profile.first_name}>
                <td>{staff.id}</td>
                <td>{staff.profile.id_number}</td>
                <td>{staff.profile.first_name} {staff.profile.last_name}</td>
                <td>{staff.profile.dob}</td>
                <td>{staff.center.name}</td>
              </tr>
            ))}

          </tbody>
        </table>
        {/* Pagination */}
        <nav aria-label="..."  className="pagination1">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
            </li>
            {Array.from({ length: Math.ceil(voters.length / votersPerPage) }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === Math.ceil(voters.length / votersPerPage) ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default StaffList;
