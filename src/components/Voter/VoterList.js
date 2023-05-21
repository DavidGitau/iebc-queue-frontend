import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './Voter.css';

const VoterList = () => {
  const [voters, setVoters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const votersPerPage = 10; // Number of voters to display per page

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/voters/');
        const limitedVoters = response.data.slice(0, 100); // Limit to 100 voters
        setVoters(limitedVoters);
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
      <div className="container-login100 lg1">
        <table>
          <thead>
            <tr>
              <th>Voter ID</th>
              <th>Name</th>
              <th>Station</th>
              {/* <th>Queue</th> */}
              <th>Service Time</th>
              <th>Waiting Time</th>
              <th>Ticket Number</th>
              <th>Voted</th>
            </tr>
          </thead>
          <tbody>
            {currentVoters.map((voter) => (
              <tr key={voter.profile.first_name}>
                <td>{voter.id}</td>
                <td>{voter.profile.first_name} {voter.profile.last_name}</td>
                <td>{voter.station.name}</td>
                {/* <td>{voter.queue.name}</td> */}
                <td>{voter.service_time}</td>
                <td>{voter.waiting_time}</td>
                <td>{voter.ticket_no}</td>
                <td>{voter.voted === true ? <span>Yes</span> : <span>No</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pagination_section">
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(voters.length / votersPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(selectedItem) => paginate(selectedItem.selected + 1)}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    </div>
  );
};

export default VoterList;
