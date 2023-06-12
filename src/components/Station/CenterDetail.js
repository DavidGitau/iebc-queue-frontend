import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CenterDetail = () => {
  const [voters, setVoters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [VotersPerPage] = useState(10); // Number of polling centers to display per page

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const localNetworkAddress = `http://${window.location.hostname}:8000`;
        const token = localStorage.getItem('token');
        const cid = localStorage.getItem('centerId');

        const response = await axios.post(
          `${localNetworkAddress}/api/center-detail/`,
          { cid: cid }, // Pass the cid along with the id
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setVoters(response.data);
      } catch (error) {
        console.log('Error fetching polling centers:', error);
      }
    };

    fetchVoters();

    // Update data
    const interval = setInterval(fetchVoters, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Get current polling centers
  const indexOfLastPollingCenter = currentPage * VotersPerPage;
  const indexOfFirstPollingCenter = indexOfLastPollingCenter - VotersPerPage;
  const currentVoters = voters.slice(indexOfFirstPollingCenter, indexOfLastPollingCenter);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="limiter">
      <div className="container-login100">
        <h2>Voters</h2>
        <table>
          <thead>
            <tr>
              <th>National ID</th>
              <th>D.O.B</th>
              <th>Name</th>
              <th>Timeslot</th>
              <th>Queue</th>
              <th>Ticket No</th>
              <th>Voted</th>
            </tr>
          </thead>
          <tbody>
            {currentVoters.map((voter) => (
              <tr key={voter.profile.id_number}>
                <td> {voter.profile.id_number} </td>
                <td> {voter.profile.dob} </td>
                <td>{voter.profile.first_name} {voter.profile.last_name}</td>
                <td>{voter.timeslot ? `${voter.timeslot.start} - ${voter.timeslot.stop}` : '-'}</td>
                <td>{voter.ticket && voter.ticket.station ? voter.ticket.station.id : '-'}</td>
                <td>{voter.ticket ? voter.ticket.id : '-'}</td>
                <td>{voter.voted ? 'Yes' : 'No'}</td>
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
            {Array.from({ length: Math.ceil(voters.length / VotersPerPage) }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === Math.ceil(voters.length / VotersPerPage) ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CenterDetail;
