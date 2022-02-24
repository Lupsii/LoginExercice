module.exports = {
  up: async (q) => {
    await q.sequelize.query(
      `
      INSERT INTO events (id, name) VALUES
        (UUID(), 'Example Event 1'),
        (UUID(), 'Example Event 2');
      `
    );
    await q.sequelize.query(
      `
      INSERT INTO users (id, phone_number, first_name, last_name, last_connected, eventId)
        SELECT UUID(), '+33612345678', 'John', 'Doe', NULL, id
        FROM events WHERE name='Example Event 1';
      `
    );
    await q.sequelize.query(
      `
      INSERT INTO users (id, phone_number, first_name, last_name, last_connected, eventId)
        SELECT UUID(), '+33600000000', 'Jean', 'Dupont', NULL, id
        FROM events WHERE name='Example Event 2';
      `
    );
    await q.sequelize.query(
      `
      INSERT INTO users (id, phone_number, first_name, last_name, last_connected, eventId, registration_number)
        SELECT UUID(), '+33622222222', 'Vincent', 'Depons', NULL, id, '1234567'
        FROM events WHERE name='Example Event 1';
      `
    );
    await q.sequelize.query(
      `
      INSERT INTO users (id, phone_number, first_name, last_name, last_connected, eventId, registration_number)
        SELECT UUID(), '+33611111111', 'Viktor', 'Peter', NULL, id, '987654'
        FROM events WHERE name='Example Event 2';
      `
    );
  },
  down: async () => {},
};
