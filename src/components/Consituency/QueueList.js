import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Voter.css';

const VoterList = () => {
  const [voters, setVoters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [votersPerPage] = useState(10); // Number of voters to display per page

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/voters');
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
              <th>Voter ID</th>
              <th>Name</th>
              <th>Station</th>
              <th>Queue</th>
              <th>Service Time</th>
              <th>Waiting Time</th>
              <th>Ticket Number</th>
              <th>Voted</th>
            </tr>
          </thead>
          <tbody>
            {currentVoters.map((voter) => (
              <tr key={voter.profile.first_name}>
                <td>{voter.voter_id}</td>
                <td>{voter.profile.first_name} {voter.profile.last_name}</td>
                <td>{voter.station.name}</td>
                <td>{voter.queue.name}</td>
                <td>{voter.service_time}</td>
                <td>{voter.waiting_time}</td>
                <td>{voter.ticket_no}</td>
                <td>{voter.voted === true ? <span>Yes</span> : <span>No</span>}</td>
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

export default VoterList;
