import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CenterList = () => {
  const [pollingCenters, setPollingCenters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pollingCentersPerPage] = useState(10); // Number of polling centers to display per page

  useEffect(() => {
    const fetchPollingCenters = async () => {
      try {
        const response = await axios.get(`http://${window.location.hostname}:8000/api/polling-centers/`);
        setPollingCenters(response.data);
      } catch (error) {
        console.log('Error fetching polling centers:', error);
      }
    };

    fetchPollingCenters();
  }, []);

  // Get current polling centers
  const indexOfLastPollingCenter = currentPage * pollingCentersPerPage;
  const indexOfFirstPollingCenter = indexOfLastPollingCenter - pollingCentersPerPage;
  const currentPollingCenters = pollingCenters.slice(indexOfFirstPollingCenter, indexOfLastPollingCenter);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="limiter">
      <div className="container-login100">
      <h2>Polling Centers</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Ward</th>
            <th>Constituency</th>
            <th>County</th>
          </tr>
        </thead>
        <tbody>
          {currentPollingCenters.map((center) => (
            <tr key={center.id}>
              <td>{center.id}</td>
              <td>{center.name}</td>
              <td>{center.ward.name}</td>
              <td>{center.ward.constituency.name}</td>
              <td>{center.ward.constituency.county.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <nav aria-label="..." className="pagination1">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
            </li>
            {Array.from({ length: Math.ceil(pollingCenters.length / pollingCentersPerPage) }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === Math.ceil(pollingCenters.length / pollingCentersPerPage) ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
      </div>
  );
};

export default CenterList;
