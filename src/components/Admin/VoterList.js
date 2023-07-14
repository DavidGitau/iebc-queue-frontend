import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../common/Table';

const VoterList = () => {
  const [voters, setVoters] = useState([]);
  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await axios.get(`http://${window.location.hostname}:8000/api/voters/`);
        const limitedVoters = response.data.slice(0, 100); // Limit to 100 voters
        setVoters(limitedVoters);
      } catch (error) {
        console.log('Error fetching voters:', error);
      }
    };

    fetchVoters();
  }, []);



  return (
    <Table
      voters={voters}
      header={
        [
          'Name & VID',
          'NID & DOB',
          'Timeslot',
          'Ticket',
        ]
      }
    />
    // <div className="limiter">
    //   <div className="container-login100">
    //     <h2>Voters</h2>
    //     <table className="voter-list-table">
    //       <thead>
    //         <tr>
    //           <th>National ID</th>
    //           <th>Voter ID</th>
    //           <th>Name</th>
    //           <th>Station</th>
    //           <th>Service Time</th>
    //           <th>Ticket Number</th>
    //           <th>Timeslot</th>
    //           <th>Voted</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {currentVoters.map((voter) => (
    //           <tr key={voter.profile.first_name}>
    //             <td>{voter.profile.id_number}</td>
    //             <td>{voter.id}</td>
    //             <td>
    //               {voter.profile.first_name} {voter.profile.last_name}
    //             </td>
    //             <td>{voter.center.name}</td>
    //             <td>{voter.service_time}</td>
    //             <td>{voter.ticket ? voter.ticket.id : '-' }</td>
    //             <td>{voter.timeslot ? `${voter.timeslot.start} - ${voter.timeslot.stop}` : '-'}</td>
    //             <td>{voter.voted === true ? <span>Yes</span> : <span>No</span>}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //     {/* Pagination */}
    //     <nav aria-label="..." className="pagination1">
    //       <ul className="pagination">
    //         <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
    //           <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
    //         </li>
    //         {pageNumbers.map((pageNumber) => (
    //           <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
    //             <button className="page-link" onClick={() => paginate(pageNumber)}>{pageNumber}</button>
    //           </li>
    //         ))}
    //         <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
    //           <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>
    // </div>
  );
};

export default VoterList;
