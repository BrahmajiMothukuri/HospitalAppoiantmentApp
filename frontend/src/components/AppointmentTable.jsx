import React from 'react';
import Loader from './Loader';

const AppointmentTable = ({ appointments, loading, error }) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 border border-red-100 rounded-md px-4 py-3 text-sm">
        {error}
      </div>
    );
  }

  if (!appointments || appointments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 text-sm text-gray-600">
        No appointments found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left text-gray-700">
            <th className="px-4 py-2">Patient Name</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Appointment Date</th>
            <th className="px-4 py-2">Dentist Name</th>
            <th className="px-4 py-2">Clinic Name</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a._id} className="border-t border-gray-100">
              <td className="px-4 py-2">{a.patientName}</td>
              <td className="px-4 py-2">{a.age}</td>
              <td className="px-4 py-2">{a.gender}</td>
              <td className="px-4 py-2">
                {a.appointmentDate
                  ? new Date(a.appointmentDate).toLocaleDateString()
                  : '-'}
              </td>
              <td className="px-4 py-2">{a.dentistName}</td>
              <td className="px-4 py-2">{a.clinicName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;

