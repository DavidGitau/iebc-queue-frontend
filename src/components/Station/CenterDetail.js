import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img1 from '../../assets/images/q1.jpg';
import img2 from '../../assets/images/q2.jpg';
import img3 from '../../assets/images/q3.jpg';
import img4 from '../../assets/images/q4.jpg';

const CenterDetail = () => {
  const [voters, setVoters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [votersPerPage] = useState(10); // Number of voters to display per page

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const localNetworkAddress = `http://${window.location.hostname}:8000`;
        const token = localStorage.getItem('token');
        const cid = localStorage.getItem('centerId');

        const response = await axios.get(
          `${localNetworkAddress}/api/center-detail/`,
          {
            params: {
              cid: cid // Pass the cid as a query parameter
            },
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

  // Get current voters
  const indexOfLastVoter = currentPage * votersPerPage;
  const indexOfFirstVoter = indexOfLastVoter - votersPerPage;
  const currentVoters = voters.slice(indexOfFirstVoter, indexOfLastVoter);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="limiter">
      <div className="container col-md-12">
        <div className="grid-1-column">
          <div className="headerc text-300 bold color-neutral-700">
            Voters
          </div>
          <div className="card overflow-hidden border-none">
            <div className="overflow-auto">
              <div className="user-table-row table-header">
                <div className="text-50 bold color-neutral-700">Name & VID</div>
                <div className="text-50 bold color-neutral-700">NID & DOB</div>
                <div className="text-50 bold color-neutral-700">Timeslot</div>
                <div className="text-50 bold color-neutral-700">Ticket </div>
              </div>
              <div className="rows">
                {currentVoters.map((voter, index) => (
                  <div
                    className={`user-table-row ${
                      index % 2 === 0 ? 'color-badge1 blue' : 'color-badge1 green'
                    }`}
                    key={voter.profile.id_number}
                  >
                    <div className="flex align-center gap-column-16px">
                      <img
                        src={
                          voter.profile.gender === 'M'
                            ? index % 2 === 0
                              ? img1
                              : img3
                            : index % 2 === 0
                            ? img2
                            : img4
                        }
                        loading="eager"
                        alt="Avatar - Dashflow X Webflow Template"
                        sizes="40px"
                        srcSet={
                          voter.profile.gender === 'M'
                            ? index % 2 === 0
                              ? img1
                              : img3
                            : index % 2 === 0
                            ? img2
                            : img4
                        }
                        className="avatar-circle _40px"
                      />
                      <div>
                        <div className="text-100 bold color-neutral-800">
                          {voter.profile.first_name} {voter.profile.last_name}
                        </div>
                        <div className="text-100 medium">{voter.id}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-100 bold color-neutral-800">
                        {voter.profile.id_number}
                      </div>
                      <div className="text-100 medium"> {voter.profile.dob}</div>
                    </div>
                    <div>
                      <div className="text-100 bold color-neutral-800">
                        {voter.timeslot ? `${voter.timeslot.start} - ${voter.timeslot.stop}` : '-'}
                      </div>
                    </div>
                    <div className="text-100 medium">{voter.voted ? 'Yes' : 'No'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <nav aria-label="..." className="pagination1 container col-md-12 ">
        <div className='card overflow-hidden border-none'>
        <ul className="pagination grid-1-column">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>
              Previous
            </button>
          </li>
          {Array.from({ length: Math.ceil(voters.length / votersPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === Math.ceil(voters.length / votersPerPage) ? 'disabled' : ''
            }`}
          >
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
        </div>
      </nav>
    </div>
  );
};

export default CenterDetail;
