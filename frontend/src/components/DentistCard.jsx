import React from 'react';

const DentistCard = ({ dentist, onBook }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="h-40 w-full overflow-hidden">
        <img
          src={dentist.photo}
          alt={dentist.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          {dentist.name}
        </h2>
        <p className="text-sm text-gray-600">{dentist.qualification}</p>
        <p className="text-sm text-gray-600 mb-2">
          {dentist.experienceYears} years experience
        </p>
        <p className="text-sm font-medium text-gray-800">
          {dentist.clinicName}
        </p>
        <p className="text-sm text-gray-600">{dentist.address}</p>
        <p className="text-sm text-gray-600 mb-4">{dentist.location}</p>
        <div className="mt-auto pt-2">
          <button
            type="button"
            onClick={() => onBook(dentist)}
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DentistCard;

