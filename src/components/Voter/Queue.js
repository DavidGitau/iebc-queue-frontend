import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import Speedometer from 'react-d3-speedometer';
import html2pdf from 'html2pdf.js';


const Queue = () => {
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
        console.log(response.data);
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
  // Function to handle PDF download
  const handleDownload = () => {
    const element = document.getElementById('voter-table');
    html2pdf()
      .set({
        margin: 0.5,
        filename: 'queue.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .from(element)
      .save();
  };

  return (
    <div className="limiter">
      <div className="container">
        <div className="row" id="voter-table">
          {queues.map((queue, index) => (
            <div className="col-md-6 container-login100" key={queue.station.id}>
              <div className="grid-1-column">
                <div className="headerc color-neutral-700">
                  Queue {index+1} - {queue.station.id}
                </div>
            <div className="table1 col-md-12 overflow-hidden border-none">
                      {queue.tickets.length >= 0 && (
              <div className="card1">
                <div className="card pd-16px">
                  <div className="mg-bottom-16px">
                    <div className="_2-items-wrap-container align-start gap-column-20px">
                      <div className="text-center mg-bottom-16px">
                        <div>Waiting Time for Each Voter</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <BarChart width={220} height={170} data={queue.tickets}>
                        <>
                          <XAxis dataKey="id" />
                          <YAxis />
                          <Tooltip />
                          {/* <Legend /> */}
                          <Bar dataKey="voter.service_time" fill="#005bea" />
                        </>
                    </BarChart>

                  </div>
                </div>
              </div>
                      )}
              <div className="card1">
                {/* <div className="card pd-16px"> */}
                  {/* <div className="mg-bottom-16px"> */}
                <div className="card amount-over-graph">
                  <div className="text-center mg-bottom-16px">
                    <div className="text-100 medium">Total Waiting Time in Mins</div>
                  </div>
                  <div>
                    <Speedometer
                      minValue={0}
                      maxValue={60}
                      value={queue.waiting_time}
                      segments={50}
                      needleColor="blue"
                      startColor="green"
                      endColor="red"
                      width={220}
                      height={170}
                      customSegmentLabels={[]}
                      needleHeightRatio={0.7}
                      maxSegmentLabels={0}
                    />
                  </div>
                  <div className="amount-over-graph-container">
                        <div className="text-500 bold color-neutral-800">{queue.tickets ? queue.tickets.length: 0} Voter(s)</div>
                    {/* <div className="text-50 medium">Card subtitle</div> */}
                  </div>
                {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
          ))}
        </div>
        {/* Download Button */}
      <button className="login100-form-btn bt1" onClick={handleDownload}>
        Download as PDF
      </button>
      </div>
    </div>
  );
};

export default Queue;
