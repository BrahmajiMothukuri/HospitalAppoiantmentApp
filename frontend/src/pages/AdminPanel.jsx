import React, { useEffect, useState } from 'react';
import { getAppointments } from '../services/api';
import AppointmentTable from '../components/AppointmentTable';

const AdminPanel = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getAppointments();
        setAppointments(res.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Panel</h1>
        <p className="text-sm text-gray-600 mt-1">
          View all booked appointments.
        </p>
      </div>
      <AppointmentTable
        appointments={appointments}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default AdminPanel;

