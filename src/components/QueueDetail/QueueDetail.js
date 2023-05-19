import React from 'react';
import './QueueDetail.css'; // Import the CSS file

const QueueDetail = () => {
  // Sample queue details
  const queueDetails = [
    { number: 1, name: 'John Doe', timeSlot: '10:00 AM - 11:00 AM' },
    { number: 2, name: 'Jane Smith', timeSlot: '11:00 AM - 12:00 PM' },
    { number: 3, name: 'Mark Johnson', timeSlot: '12:00 PM - 01:00 PM' },
    // Add more queue details
  ];

  return (
    <div className="queue-detail-container">
      <h2 className="queue-detail-heading">Queue Detail</h2>
      <table className="queue-table">
        <thead>
          <tr>
            <th className="queue-table-header">Queue Number</th>
            <th className="queue-table-header">Name</th>
            <th className="queue-table-header">Time Slot</th>
          </tr>
        </thead>
        <tbody>
          {queueDetails.map((detail) => (
            <tr key={detail.number}>
              <td className="queue-table-data">{detail.number}</td>
              <td className="queue-table-data">{detail.name}</td>
              <td className="queue-table-data">{detail.timeSlot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueueDetail;
