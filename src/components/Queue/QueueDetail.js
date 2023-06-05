import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Voter/Voter.css';

const QueueDetail = () => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const localNetworkAddress = `http://${window.location.hostname}:8000`;
        const token = localStorage.getItem('token');
        const cid = localStorage.getItem('centerId');

        const response = await axios.post(
          `${localNetworkAddress}/api/queue-detail/`,
          { cid: cid }, // Pass the cid along with the id
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        console.log(response.data);
        setQueue(response.data);
        console.log(queue.length);
      } catch (error) {
        console.log('Error fetching queues:', error);
      }
    };

    fetchQueues();

    const interval = setInterval(fetchQueues, 1000); // Fetch data every second

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  return (
    <div className="limiter">
      <div className="container-login100">
        <h2>Queues</h2>
        {queue.tickets && queue.tickets.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Station</th>
                <th>Voter ID</th>
              </tr>
            </thead>
            <tbody>
              {queue.tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.station.name} {ticket.station.id}</td>
                  <td>{ticket.voter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tickets available</p>
        )}
      </div>
    </div>
  );
};

export default QueueDetail;
