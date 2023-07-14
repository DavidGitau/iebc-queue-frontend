import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img1 from '../../assets/images/q1.jpg';
import img2 from '../../assets/images/q2.jpg';
import img3 from '../../assets/images/q3.jpg';
import img4 from '../../assets/images/q4.jpg';
import html2pdf from 'html2pdf.js';

// const Countdown = ({ initialValue, onStop, queueId, isStopped }) => {
//   const initialSeconds = initialValue * 60; // Convert initial value to seconds
//   const [count, setCount] = useState(initialSeconds);
//   const [hasReachedZero, setHasReachedZero] = useState(false);

//   useEffect(() => {
//     if (isStopped) {
//       // If isStopped is true, return early without starting the interval
//       return;
//     }

//     const interval = setInterval(() => {
//       setCount((prevCount) => {
//         if (prevCount <= 0) {
//           clearInterval(interval);
//           setHasReachedZero(true);
//           onStop(queueId); // Call the onStop callback with the queueId
//           return 0;
//         }
//         return prevCount;
//       });
//     }, 10000); // Adjusted interval to 1000 milliseconds (1 second)

//     return () => clearInterval(interval);
//   }, [onStop, queueId, isStopped]);

//   // Convert seconds back to minutes for display
//   const displayCount = (count / 60).toFixed(2);

//   return (
//     <div className={`color-badge ${hasReachedZero || isStopped ? 'blue' : 'green'} text-300`}>
//       {displayCount}
//     </div>
//   );
// };

const QueueDetail = () => {
  const [queues, setQueues] = useState([]);
  const [fetchInterval, setFetchInterval] = useState(null);

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const localNetworkAddress = `http://${window.location.hostname}:8000`;
        const token = localStorage.getItem('token');
        const cid = localStorage.getItem('centerId');

        const response = await axios.post(
          `${localNetworkAddress}/api/queue-detail/`,
          { cid: cid },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setQueues(response.data);
      } catch (error) {
        console.log('Error fetching queues:', error);
      }
    };

    const interval = setInterval(fetchQueues, 5000);
    setFetchInterval(interval);

    return () => {
      clearInterval(fetchInterval);
    };
  }, [fetchInterval]);

  // const handleCountdownStop = (queueId) => {
  //   setQueues((prevQueues) =>
  //     prevQueues.map((queue) => {
  //       if (queue.station.id === queueId) {
  //         return {
  //           ...queue,
  //           stopped: true,
  //         };
  //       }
  //       return queue;
  //     })
  //   );
  // };
  // Function to handle PDF download
  const handleDownload = () => {
    const element = document.getElementById('voter-table');
    html2pdf()
      .set({
        margin: 0.5,
        filename: 'queue-user.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' },
      })
      .from(element)
      .save();
  };

  return (
    <div className="limiter">
      <div className="container">
        <div className="row"  id="voter-table">
          {queues.map((queue) => (
            <div className="col-md-12 container-login100" key={queue.station.id}>
              <div className="grid-1-column">
                <div className="headerc text-300 bold color-neutral-700">
                  Queue {queue.station.id} {queue.waiting_time} mins
                </div>
                <div className="card overflow-hidden border-none">
                  <div className="overflow-auto">
                    <div className="user-table-row table-header">
                      <div className="text-50 bold color-neutral-700">Voter</div>
                      <div className="text-50 bold color-neutral-700">Ticket</div>
                      <div className="text-50 bold color-neutral-700">Service time</div>
                      {/* <div className="text-50 bold color-neutral-700">Waiting time</div> */}
                    </div>
                    <div className="rows">
                      {queue.tickets && queue.tickets.length > 0 ? (
                        <>
                          {queue.tickets
                            .slice()
                            .sort((a, b) => a.queue_number - b.queue_number)
                            .map((ticket, index) => (
                              <div className={`user-table-row color-badge1 ${ticket.type === 'S' ? 'red' : ticket.type === 'A' ? 'green' : 'blue'}`}>
                                <div className="flex align-center gap-column-16px">
                                  <img
                                    src={
                                      ticket.voter.profile.gender === 'M'
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
                                      ticket.voter.profile.gender === 'M'
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
                                      {ticket.voter.profile.first_name} {ticket.voter.profile.last_name}
                                    </div>
                                    <div className="text-100 medium">{ticket.voter.profile.id_number}</div>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-100 bold color-neutral-800">Number: {ticket.id}</div>
                                  <div className="text-100 medium">Type {ticket.type}</div>
                                </div>
                                <div className="text-100 medium">{ticket.voter.service_time}</div>
                                {/* <div>
                                  <div>
                                    <Countdown
                                      initialValue={ticket.waiting_time}
                                      onStop={handleCountdownStop}
                                      queueId={queue.station.id}
                                      isStopped={queue.stopped}
                                    />
                                  </div>
                                </div> */}
                              </div>
                            ))}
                        </>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Download Button */}
      {/* <button className="login100-form-btn bt1" onClick={handleDownload}>
        Download as PDF
      </button> */}
      </div>
    </div>
  );
};

export default QueueDetail;
