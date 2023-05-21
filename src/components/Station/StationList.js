import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../Voter/Voter.css'

const PollingStationList = () => {
  const [pollingStations, setPollingStations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pollingStationsPerPage = 10; // Number of polling stations to display per page

  useEffect(() => {
    const fetchPollingStations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/polling-stations/');
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
  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  return (
    <div>
      <h2>Polling Station List</h2>
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
      <div>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(pollingStations.length / pollingStationsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default PollingStationList;
