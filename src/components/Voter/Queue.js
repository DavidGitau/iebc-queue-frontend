import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Speedometer from 'react-d3-speedometer';

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

    const interval = setInterval(fetchQueues, 1000);
    setFetchInterval(interval);

    return () => {
      clearInterval(fetchInterval);
    };
  }, []);
  const data = [
    { name: 'Category 1', value: 120 },
    { name: 'Category 2', value: 200 },
    { name: 'Category 3', value: 150 },
  ];

  return (
    <div className="limiter">
      <div className="container">
        <div className="row">
          {queues.map((queue, index) => (
            <div className="col-md-6 container-login100" key={queue.station.id}>
              <div className="grid-1-column">
                <div className="headerc color-neutral-700">
                  Queue {index+1} - {queue.station.id}
                </div>
            <div className="table1 col-md-12 overflow-hidden border-none">
                      {queue.tickets.length > 0 && (
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
                          <XAxis dataKey="queue_number" />
                          <YAxis />
                          <Tooltip />
                          {/* <Legend /> */}
                          <Bar dataKey="waiting_time" fill="#8884d8" />
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
      </div>
    </div>
  );
};

export default Queue;
