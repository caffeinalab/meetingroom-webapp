const moment = require('moment');
const { google } = require('googleapis');

let googleCalendarClient;

function calendarTransformer(e) {
	return {
		id: e.id,
	};
}

function attendeeTransformer(e) {
	let displayName = e.displayName;
	if (displayName == null) {
		if (/.+\@.+/.test(e.email)) {
			displayName = e.email.replace(/\@.+$/, '');
			displayName = displayName.split('.').map(e => {
				return e.substr(0, 1).toUpperCase() + e.substr(1);
			}).join(' ');
		}
	}

	return {
		email: e.email,
		organizer: e.organizer,
		displayName: displayName,
		responseStatus: e.responseStatus
	};
}

function eventTransformer(e) {
	return {
		id: e.id,
		name: e.summary,
		description: e.description,
		status: e.status,
		organizer: e.organizer,
		allDay: !!e.start.date,
		start: e.start.dateTime,
		end: e.end.dateTime,
		attendees: e.attendees.filter(e => !e.resource).map(e => attendeeTransformer(e))
	};
}

exports.getCalendarList = function () {
	return new Promise((resolve) => {
		googleCalendarClient.calendarList.list({}, (err, response) => {
			if (err) throw err;
			resolve(
				response.data.items
				.filter(e => (e.id.indexOf('resource.calendar') >= 0))
				.map(e => calendarTransformer(e))
			);
		});
	});
};

exports.getCalendar = function (calendarId) {
	return new Promise((resolve) => {
		googleCalendarClient.calendars.get({
			calendarId: calendarId
		}, (err, {
			data
		}) => {
			if (err) throw err;
			resolve(calendarTransformer(data));
		});
	});
};

exports.getEvents = function (calendarId) {
	return new Promise((resolve) => {
		googleCalendarClient.events.list({
			calendarId: calendarId
		}, (err, {
			data
		}) => {
			if (err) throw err;
			resolve(data.items);
		});
	});
};

exports.getCurrentEvent = function (calendarId, opt = {}) {
	return new Promise((resolve) => {
		googleCalendarClient.events.list({
			calendarId: calendarId,
			singleEvents: true,
			timeMin: moment().format(),
			timeMax: moment().add(1, 'second').format()
		}, (err, response) => {
			if (err) throw err;
			if (response.data.items.length == 0) return resolve(null);

			return resolve(eventTransformer(response.data.items[0]));
		});
	});
};

exports.getNextEvents = function (calendarId) {
	return new Promise(async (resolve) => {
		googleCalendarClient.events.list({
			calendarId: calendarId,
			timeMin: moment().format(),
			timeMax: moment().add(1, 'second').format(),
			singleEvents: true,
		}, (err, response) => {
			if (err) throw err;

			let endDate;
			if (response.data.items.length > 0) {
				if (response.data.items[0].end.dateTime) {
					endDate = response.data.items[0].end.dateTime;
				}
			}

			googleCalendarClient.events.list({
				calendarId: calendarId,
				timeMin: endDate ? moment(endDate).format() : moment().format(),
				timeMax: moment().add(1, 'day').startOf('day').format(),
				singleEvents: true,
				orderBy: 'startTime'
			}, (err, response) => {
				if (err) throw err;
				if (response.data.items.length == 0) return resolve(null);

				resolve(response.data.items.map(e => eventTransformer(e)));
			});
		});
	});
};

exports.initialize = function() {
	return new Promise(async(resolve) => {
		if (googleCalendarClient != null) return resolve();
		googleCalendarClient = google.calendar({
			version: 'v3',
			auth: await (require('./auth').getAuthClient())
		});
		resolve();
	});
};
