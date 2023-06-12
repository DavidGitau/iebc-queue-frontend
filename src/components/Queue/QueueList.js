import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

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

  // Change page
  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  return (
    <div className="limiter">
      <div className="container-login100">
      <h2>Queues</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Length</th>
            <th>Station</th>
          </tr>
        </thead>
        <tbody>
          {currentQueues.map((queue) => (
            <tr key={queue.id}>
              <td>{queue.id}</td>
              <td>{queue.name}</td>
              <td>{queue.length}</td>
              <td>{queue.station.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(queues.length / queuesPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
      </div>
      </div>
  );
};

export default QueueList;
