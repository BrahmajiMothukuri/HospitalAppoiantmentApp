const { db } = require('../config/db');

const getDentists = async (req, res, next) => {
  try {
    const dentists = await new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM dentists ORDER BY datetime(createdAt) DESC',
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
      data: dentists,
    });
  } catch (error) {
    next(error);
  }
};

const createDentist = async (req, res, next) => {
  try {
    const {
      name,
      photo,
      qualification,
      experienceYears,
      clinicName,
      address,
      location,
    } = req.body;

    if (
      !name ||
      !photo ||
      !qualification ||
      experienceYears === undefined ||
      !clinicName ||
      !address ||
      !location
    ) {
      const err = new Error('All dentist fields are required');
      err.statusCode = 400;
      throw err;
    }

    const createdAt = new Date().toISOString();

    const inserted = await new Promise((resolve, reject) => {
      const stmt =
        'INSERT INTO dentists (name, photo, qualification, experienceYears, clinicName, address, location, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

      db.run(
        stmt,
        [
          name,
          photo,
          qualification,
          experienceYears,
          clinicName,
          address,
          location,
          createdAt,
        ],
        function onResult(err) {
          if (err) return reject(err);
          db.get(
            'SELECT * FROM dentists WHERE id = ?',
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
      data: inserted,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDentists,
  createDentist,
};

