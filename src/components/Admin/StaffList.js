import React, { useEffect, useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const StaffList = () => {
  const [staffs, setStaffs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const staffsPerPage = 10; // Number of staffs to display per page

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await axios.get(`http://${window.location.hostname}:8000/api/staffs/`);
        setStaffs(response.data);
      } catch (error) {
        console.log('Error fetching staffs:', error);
      }
    };

    fetchStaffs();
  }, []);

  // Get current staffs
  const indexOfLastStaff = currentPage * staffsPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffsPerPage;
  const currentStaffs = staffs.slice(indexOfFirstStaff, indexOfLastStaff);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDownload = () => {
    try {
      const element = document.getElementById('staff-table');

      html2pdf()
        .set({
          margin: 0.5,
          filename: 'staff_list.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        })
        .from(element)
        .save();
    } catch (error) {
      console.log('Error downloading staff list:', error);
    }
  };

  return (
    <div className="limiter">
      <div className="container col-md-12">
        <div className="grid-1-column" id="staff-table">
          <div className="headerc text-300 bold color-neutral-700">Staff List</div>
          <div className="card overflow-hidden border-none">
            <table className="overflow-auto">
              <thead>
                <tr className="user-table-row table-header">
                  <th className="text-50 bold color-neutral-700">N ID</th>
                  <th className="text-50 bold color-neutral-700">Name</th>
                  <th className="text-50 bold color-neutral-700">D.O.B</th>
                  <th className="text-50 bold color-neutral-700">Center</th>
                </tr>
              </thead>
              <tbody>
                {currentStaffs.map((staff) => (
                  <tr
                    className={`user-table-row ${staff.id % 2 === 0 ? 'color-badge1 blue' : 'color-badge1 green'}`}
                    key={staff.profile.first_name}
                  >
                    <td >
                      <div className="text-100 medium color-neutral-800">{staff.profile.id_number}</div>
                    </td>
                    <td >
                      <div className="text-100 medium color-neutral-800">{`${staff.profile.first_name} ${staff.profile.last_name}`}</div>
                    </td>
                    <td >
                      <div className="text-100 medium color-neutral-800">{staff.profile.dob}</div>
                    </td>
                    <td >
                      <div className="text-100 medium color-neutral-800">{staff.center.name}</div>
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
          {Array.from({ length: Math.ceil(staffs.length / staffsPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === Math.ceil(staffs.length / staffsPerPage) ? 'disabled' : ''}`}
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
        Download Staff List as PDF
      </button>
    </div>
  );
};

export default StaffList;
