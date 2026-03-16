const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '..', 'database.db');

const db = new sqlite3.Database(dbPath);

const initDb = () =>
  new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS dentists (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          photo TEXT NOT NULL,
          qualification TEXT NOT NULL,
          experienceYears INTEGER NOT NULL,
          clinicName TEXT NOT NULL,
          address TEXT NOT NULL,
          location TEXT NOT NULL,
          createdAt TEXT NOT NULL
        )`,
        (err) => {
          if (err) {
            return reject(err);
          }
        }
      );

      db.run(
        `CREATE TABLE IF NOT EXISTS appointments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          patientName TEXT NOT NULL,
          age INTEGER NOT NULL,
          gender TEXT NOT NULL,
          appointmentDate TEXT NOT NULL,
          dentistId INTEGER NOT NULL,
          dentistName TEXT NOT NULL,
          clinicName TEXT NOT NULL,
          createdAt TEXT NOT NULL,
          FOREIGN KEY (dentistId) REFERENCES dentists(id)
        )`,
        (err) => {
          if (err) {
            return reject(err);
          }
        }
      );

      const placeholderPhoto =
        'https://images.pexels.com/photos/5327861/pexels-photo-5327861.jpeg?auto=compress&cs=tinysrgb&w=600';

      db.get('SELECT COUNT(*) as count FROM dentists', (err, row) => {
        if (err) {
          return reject(err);
        }

        if (row.count > 0) {
          console.log('Dentists already seeded');
          return resolve();
        }

        const createdAt = new Date().toISOString();
        const stmt = db.prepare(
          `INSERT INTO dentists 
            (name, photo, qualification, experienceYears, clinicName, address, location, createdAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        );

        stmt.run(
          'Dr. Rahul Sharma',
          placeholderPhoto,
          'BDS, MDS',
          10,
          'SmileCare Clinic',
          '123, MG Road, Andheri East',
          'Mumbai',
          createdAt
        );

        stmt.run(
          'Dr. Priya Mehta',
          placeholderPhoto,
          'BDS',
          6,
          'Bright Dental',
          '45, Connaught Place',
          'Delhi',
          createdAt
        );

        stmt.finalize((finalizeErr) => {
          if (finalizeErr) {
            return reject(finalizeErr);
          }
          console.log('Seed dentists created');
          resolve();
        });
      });
    });
  });

module.exports = {
  db,
  initDb,
};

