import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ReactPaginate from 'react-paginate';

const PollingStationList = () => {
  const [pollingStations, setPollingStations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pollingStationsPerPage] = useState(10); // Number of polling stations to display per page

  useEffect(() => {
    const fetchPollingStations = async () => {
      try {
        const response = await axios.get(`http://${window.location.hostname}:8000/api/polling-stations/`);
        setPollingStations(response.data);
      } catch (error) {
        console.log('Error fetching polling stations:', error);
      }
    };

    fetchPollingStations();
  }, []);

  // Get current polling stations
  const indexOfLastPollingStation = currentPage * pollingStationsPerPage;
  const indexOfFirstPollingStation = indexOfLastPollingStation - pollingStationsPerPage;
  const currentPollingStations = pollingStations.slice(indexOfFirstPollingStation, indexOfLastPollingStation);

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
              <th>Center</th>
              <th>Voter Count</th>
            </tr>
          </thead>
          <tbody>
            {currentPollingStations.map((station) => (
              <tr key={station.id}>
                <td>{station.id}</td>
                <td>{station.name}</td>
                <td>{station.center.name}</td>
                <td>{station.voter_no}</td>
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
            {Array.from({ length: Math.ceil(pollingStations.length / pollingStationsPerPage) }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === Math.ceil(pollingStations.length / pollingStationsPerPage) ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PollingStationList;
