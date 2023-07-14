import React, { useState } from 'react';
import img1 from '../../assets/images/q1.jpg';
import img2 from '../../assets/images/q2.jpg';
import img3 from '../../assets/images/q3.jpg';
import img4 from '../../assets/images/q4.jpg';
import Pagination from './Pagination';
import html2pdf from 'html2pdf.js';

const Table = ({ voters, header }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [votersPerPage] = useState(10); // Number of voters to display per page
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  // Get current voters
  const indexOfLastVoter = currentPage * votersPerPage;
  const indexOfFirstVoter = indexOfLastVoter - votersPerPage;
  const currentVoters = voters.slice(indexOfFirstVoter, indexOfLastVoter);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle PDF download
  const handleDownload = () => {
    const element = document.getElementById('voter-table');
    html2pdf()
      .set({
        margin: 0.5,
        filename: 'voter_list.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .from(element)
      .save();
  };

  // Handle column header click for sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      // Toggle sort direction if same column clicked
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      // Set new sort column and reset sort direction
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Apply sorting to voters
  const sortedVoters = [...currentVoters].sort((a, b) => {
    if (sortColumn) {
      const valueA = a[sortColumn] || '';
      const valueB = b[sortColumn] || '';

      if (sortDirection === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    } else {
      return 0;
    }
  });

  return (
    <div className="limiter">
      <div className="container col-md-12">
        <div className="grid-1-column" id="voter-table">
          <div className="headerc text-300 bold color-neutral-700">Voters</div>
          <div className="card overflow-hidden border-none">
            <table className="overflow-auto">
              <thead>
                <tr className="user-table-row table-header">
                  {header.map((h, index) => (
                    <th className="text-50 bold color-neutral-700" key={index}>
                      <div className="table-header-cell" onClick={() => handleSort(h)}>
                        {h}
                        {sortColumn === h && (
                          <span className={`sort-indicator ${sortDirection}`} />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedVoters.map((voter, index) => (
                  <tr
                    className={`user-table-row ${
                      index % 2 === 0 ? 'color-badge1 blue' : 'color-badge1 green'
                    }`}
                    key={voter.timeslot}
                  >
                    <td className="flex align-center gap-column-16px">
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
                    </td>
                    <td>
                      <div className="text-100 bold color-neutral-800">{voter.profile.id_number}</div>
                      <div className="text-100 medium"> {voter.profile.dob}</div>
                    </td>
                    <td>
                      <div className="text-100 bold color-neutral-800">
                        {voter.timeslot ? `${voter.timeslot.start} - ${voter.timeslot.stop}` : '-'}
                      </div>
                    </td>
                    <td className="text-100 medium">{voter.voted ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(voters.length / votersPerPage)}
        onPageChange={paginate}
      />
      {/* Download Button */}
      <button className="login100-form-btn bt1" onClick={handleDownload}>
        Download Voter List as PDF
      </button>
    </div>
  );
};

export default Table;
