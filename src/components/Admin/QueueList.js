import React, { useEffect, useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const QueueList = () => {
  const [queues, setQueues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const queuesPerPage = 10; // Number of queues to display per page

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const response = await axios.get(`http://${window.location.hostname}:8000/api/queues/`);
        setQueues(response.data);
      } catch (error) {
        console.log('Error fetching queues:', error);
      }
    };

    fetchQueues();
  }, []);

  // Get current queues
  const indexOfLastQueue = currentPage * queuesPerPage;
  const indexOfFirstQueue = indexOfLastQueue - queuesPerPage;
  const currentQueues = queues.slice(indexOfFirstQueue, indexOfLastQueue);

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
          <div className="headerc text-300 bold color-neutral-700">Queues</div>
          <div className="card overflow-hidden border-none">
            <table className="overflow-auto">
              <thead>
                <tr className="user-table-row table-header">
                  <th className="text-50 bold color-neutral-700">Name</th>
                  <th className="text-50 bold color-neutral-700">Length</th>
                  <th className="text-50 bold color-neutral-700">Station</th>
                </tr>
              </thead>
              <tbody>
                {currentQueues.map((queue, index) => (
                  <tr
                    className={`user-table-row ${
                      index % 2 === 0 ? 'color-badge1 blue' : 'color-badge1 green'
                    }`}
                    key={queue.id}
                  >
                  <td>
                      <div className="text-100 medium color-neutral-800">{queue.name}</div>
                    </td>
                    <td>
                      <div className="text-100 medium color-neutral-800">{queue.tickets.length}</div>
                    </td>
                    <td>
                      <div className="text-100 medium color-neutral-800">{queue.station.name}</div>
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
              {Array.from({ length: Math.ceil(queues.length / queuesPerPage) }, (_, index) => (
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
                className={`page-item ${currentPage === Math.ceil(queues.length / queuesPerPage) ? 'disabled' : ''}`}
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
  );
};

export default QueueList;
