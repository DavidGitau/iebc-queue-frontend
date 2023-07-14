import React, { useEffect, useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const CenterList = () => {
  const [pollingCenters, setPollingCenters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pollingCentersPerPage] = useState(10); // Number of polling centers to display per page

  useEffect(() => {
    const fetchPollingCenters = async () => {
      try {
        const response = await axios.get(`http://${window.location.hostname}:8000/api/polling-centers/`);
        const sortedData = response.data.sort((a, b) => b.voter_no - a.voter_no);
        setPollingCenters(sortedData);
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

  const handleDownload = () => {
    try {

      const html = document.getElementById('voter-table');

      html2pdf()
        .set({
          margin: 0.5,
          filename: 'centers.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        })
        .from(html)
        .save();
    } catch (error) {
      console.log('Error fetching polling centers:', error);
    }
  };

  return (
    <div className="limiter">
      <div className="container col-md-12">
        <div className="grid-1-column"  id="voter-table">
          <div className="headerc text-300 bold color-neutral-700">Polling Centers</div>
          <div id="table-container">
            <div className="card overflow-hidden border-none">
              <table className="overflow-auto">
                <thead>
                  <tr className="user-table-row table-header">
                    <th className="text-50 bold color-neutral-700">ID</th>
                    <th className="text-50 bold color-neutral-700">Name</th>
                    <th className="text-50 bold color-neutral-700">Ward</th>
                    <th className="text-50 bold color-neutral-700">Constituency</th>
                    <th className="text-50 bold color-neutral-700">County</th>
                    <th className="text-50 bold color-neutral-700">Voter No</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPollingCenters.map((center, index) => (
                    <tr
                      className={`user-table-row ${index % 2 === 0 ? 'color-badge1 blue' : 'color-badge1 green'}`}
                      key={center.id}
                    >
                      <td>
                        <div className="text-100 medium color-neutral-800">{center.id}</div>
                      </td>
                      <td>
                        <div className="text-100 medium color-neutral-800">{center.name}</div>
                      </td>
                      <td>
                        <div className="text-100 medium color-neutral-800">{center.ward.name}</div>
                      </td>
                      <td>
                        <div className="text-100 medium color-neutral-800">{center.ward.constituency.name}</div>
                      </td>
                      <td>
                        <div className="text-100 medium color-neutral-800">{center.ward.constituency.county.name}</div>
                      </td>
                      <td>
                        <div className="text-100 medium color-neutral-800">{center.voter_no}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Pagination */}
        <nav aria-label="..." className="pagination1 container col-md-12">
          <div className="card overflow-hidden border-none">
            <ul className="pagination grid-1-column">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                  Previous
                </button>
              </li>
              {Array.from({ length: Math.ceil(pollingCenters.length / pollingCentersPerPage) }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button className="page-link" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${currentPage === Math.ceil(pollingCenters.length / pollingCentersPerPage) ? 'disabled' : ''}`}
              >
                <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </div>
        </nav>
        {/* Download Button */}
        <button className="login100-form-btn bt1" onClick={handleDownload}>
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default CenterList;
