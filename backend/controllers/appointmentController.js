const { db } = require('../config/db');

const createAppointment = async (req, res, next) => {
  try {
    const { patientName, age, gender, appointmentDate, dentistId } = req.body;

    if (
      !patientName ||
      age === undefined ||
      !gender ||
      !appointmentDate ||
      !dentistId
    ) {
      const err = new Error('All appointment fields are required');
      err.statusCode = 400;
      throw err;
    }

    const dentist = await new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM dentists WHERE id = ?',
        [Number(dentistId)],
        (err, row) => {
          if (err) return reject(err);
          resolve(row);
        }
      );
    });

    if (!dentist) {
      const err = new Error('Dentist not found');
      err.statusCode = 404;
      throw err;
    }

    const createdAt = new Date().toISOString();

    const appointment = await new Promise((resolve, reject) => {
      const stmt =
        'INSERT INTO appointments (patientName, age, gender, appointmentDate, dentistId, dentistName, clinicName, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

      db.run(
        stmt,
        [
          patientName,
          age,
          gender,
          appointmentDate,
          dentist.id,
          dentist.name,
          dentist.clinicName,
          createdAt,
        ],
        function onResult(err) {
          if (err) return reject(err);
          db.get(
            'SELECT * FROM appointments WHERE id = ?',
            [this.lastID],
            (getErr, row) => {
              if (getErr) return reject(getErr);
              resolve({
                _id: row.id,
                ...row,
              });
            }
          );
        }
      );
    });

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

const getAppointments = async (req, res, next) => {
  try {
    const appointments = await new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM appointments ORDER BY datetime(appointmentDate) ASC',
        (err, rows) => {
          if (err) return reject(err);
          const mapped = rows.map((row) => ({
            _id: row.id,
            ...row,
          }));
          resolve(mapped);
        }
      );
    });

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAppointment,
  getAppointments,
};

