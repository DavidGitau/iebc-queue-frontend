import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QueueDetail = () => {
  const [queues, setQueue] = useState([]);

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

        // console.log(response.data);
        setQueue(response.data);
        console.log(queues.length);
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
      <div className="container">
      <div className="row">
      {queues.map((queue) => (
          <div className="col-md-6 container-login100">
            <h5>Queue {queue.station.id}</h5>
            <table>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Voter ID</th>
                  <th>Waiting time</th>
                </tr>
              </thead>
          {queue.tickets && queue.tickets.length > 0 ? (
            <>
              <tbody>
                {queue.tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.voter.id}</td>
                    <td>{ticket.voter.serive_time}</td>
                  </tr>
                ))}
              </tbody></>
          ) : (
            <p></p>
            )}
            </table>
              </div>
          ) )
        }
        </div>
      </div>
    </div>
  );
};

export default QueueDetail;
