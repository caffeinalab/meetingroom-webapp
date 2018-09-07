const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const cal = require('../lib/calendar');

/**
 * Heartbeat route to know if an update have to occur
 */
router.get('/heartbeat', async (req, res) => {
	const { name, version } = require('../package.json');
	res.json({
		name,
		version
	});
});

/**
 * Get all rooms
 */
router.get('/rooms', async (req, res) => {
	db.query('select * from rooms', (err, data) => {
		if (err) throw err;
		res.json(data);
	});
});

/**
 * Single room
 */
router.get('/rooms/:id', async (req, res) => {
	db.query('select * from rooms where id = ?', [ req.params.id ], (err, data) => {
		if (err) throw err;
		if (data.length === 0) throw { notFound: true };
		return res.json(data[0]);
	});
});

/**
 * Get current event of the room
 */
router.get('/rooms/:id/now', async (req, res) => {
	db.query('select * from rooms where id = ?', [ req.params.id ], async(err, data) => {
		if (err) throw err;
		if (data.length === 0) throw { notFound: true };
		await cal.initialize();
		const event = await cal.getCurrentEvent(data[0].email);
		res.json(event);
	});
});

/**
 * Get next events of the room
 */
router.get('/rooms/:id/next', async (req, res) => {
	db.query('select * from rooms where id = ?', [ req.params.id ], async(err, data) => {
		if (err) throw err;
		if (data.length === 0) throw { notFound: true };
		await cal.initialize();
		const events = await cal.getNextEvents(data[0].email);
		res.json(events);
	});
});

/**
 * Get all quotes
 */
router.get('/quotes', async (req, res) => {
	db.query('select * from quotes order by created_at desc limit 3', (err, data) => {
		if (err) throw err;
		res.json(data);
	});
});

module.exports = router;