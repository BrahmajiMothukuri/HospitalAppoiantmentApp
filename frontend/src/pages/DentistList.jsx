import React, { useEffect, useState } from 'react';
import { getDentists } from '../services/api';
import DentistCard from '../components/DentistCard';
import BookingModal from '../components/BookingModal';
import Loader from '../components/Loader';

const DentistList = () => {
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDentist, setSelectedDentist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDentists = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getDentists();
        setDentists(res.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load dentists');
      } finally {
        setLoading(false);
      }
    };

    fetchDentists();
  }, []);

  const handleBookClick = (dentist) => {
    setSelectedDentist(dentist);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDentist(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Find Your Dentist
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Browse our experienced dentists and book your appointment instantly.
        </p>
      </div>

      {loading && <Loader />}
      {error && !loading && (
        <div className="mb-4 bg-red-50 text-red-700 border border-red-100 rounded-md px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dentists.map((dentist) => (
            <DentistCard
              key={dentist._id}
              dentist={dentist}
              onBook={handleBookClick}
            />
          ))}
          {dentists.length === 0 && (
            <div className="col-span-full text-sm text-gray-600">
              No dentists available.
            </div>
          )}
        </div>
      )}

      <BookingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        dentist={selectedDentist}
        onSuccess={() => {}}
      />
    </div>
  );
};

export default DentistList;

