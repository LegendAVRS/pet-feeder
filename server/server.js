const express = require('express');
const app = express();
var cors = require('cors');
app.use(express.json(), cors());

// Endpoint: /api/homeData
let homeData = {
    food: 100,
    water: 200,
    temp: 24,
    humid: 60,
    duration: 1000,
    nextFeed: {
        value: 50,
        time: 1692003000,
    },
    prevFeed: {
        value: 60,
        time: 1692004000,
    },
    lastImg: {
        image_url: "https://i.kym-cdn.com/photos/images/original/002/269/118/f8c.jpg",
        time: 1692000000
    }
};

app.get('/api/homeData', (req, res) => {
    res.json(homeData);
});

// Endpoint: /api/gallery/
let images = [
    { image_url: "https://i.kym-cdn.com/photos/images/original/002/269/118/f8c.jpg", capturedTime: 1692001000 },
    { image_url: "https://i.kym-cdn.com/photos/images/original/002/269/118/f8c.jpg", capturedTime: 1692002000 },
];

app.get('/api/gallery', (req, res) => {
    res.json({ images });
});

// Endpoint: /api/foodDrink/
let feedList = [
    { value: 100, time: 1692000000 },
    { value: 90, time: 1692001000 },
];

let waterList = [
    { value: 50, time: 1692003000 },
    { value: 60, time: 1692004000 },
];

app.post('/api/foodDrink/', (req, res) => {
    const { start, end } = req.body;
    const filterFeedList = feedList.filter(
        item => item.time >= start && item.time <= end
    );
    const filterWaterList = waterList.filter(
        item => item.time >= start && item.time <= end
    );
    console.log(filterFeedList)
    res.json({ feedList: filterFeedList, waterList: filterWaterList });
});

// Endpoint: /api/environment/
let tempList = [
    { value: 24, time: 1692000000 },
    { value: 25, time: 1692001000 },
    { value: 26, time: 1692002000 },
];

let humidList = [
    { value: 60, time: 1692000000 },
    { value: 55, time: 1692001000 },
    { value: 50, time: 1692002000 },
];

app.post('/api/environment/', (req, res) => {
    const { start, end } = req.body;
    const filterTempList = tempList.filter(
        item => item.time >= start && item.time <= end
    );
    const filterHumidList = humidList.filter(
        item => item.time >= start && item.time <= end
    );
    res.json({ tempList: filterTempList, humidList: filterHumidList });
});

// Endpoint: /api/schedule/
let schedule = [
    { id: 1, value: 50, time: "2040", isOn: true },
    { id: 2, value: 60, time: "1000", isOn: false },
];

app.get('/api/schedule', (req, res) => {
    res.json({ schedule });
});

// Endpoint: /api/schedule/ POST
app.post('/api/schedule', (req, res) => {
    const { value, time, isOn } = req.body;
    const id = schedule.length + 1;
    schedule.push({ id, value, time, isOn });
    console.log(schedule);
    res.json(true);
});

// Endpoint: /api/schedule/:id UPDATE
app.post('/api/schedule/:id', (req, res) => {
    const { id } = req.params;
    const { value, time, isOn } = req.body;
    console.log(id);
    const chosenSchedule = schedule.findIndex(s => s.id == id);
    if (schedule) {
        schedule[chosenSchedule].value = value;
        schedule[chosenSchedule].time = time;
        schedule[chosenSchedule].isOn = isOn;
        console.log(schedule);
        res.json(true);
    } else {
        res.status(404).json({ error: "Schedule not found" });
    }
});

// Endpoint: /api/schedule/:id DELETE
app.delete('/api/schedule/:id', (req, res) => {
    const { id } = req.params;
    const index = schedule.findIndex(s => s.id == id);
    if (index !== -1) {
        schedule.splice(index, 1);
        res.json(true);
    } else {
        res.status(404).json({ error: "Schedule not found" });
    }
});

// Endpoint: /api/camera
app.get('/api/camera', (req, res) => {
    res.json({ images });
});

// Endpoint: /api/feedNow
app.post('/api/feedNow', (req, res) => {
    res.json(true);
});

// Endpoint: /api/restart
app.post('/api/restart', (req, res) => {
    res.json(true);
});

// Endpoint: /api/status
app.get('/api/status', (req, res) => {
    res.json({
        software: "0.10.0-alpha",
        ip: "192.168.1.2",
        board: "esp32",
        wifi: "Wokwi-GUEST",
    });
});

// Endpoint: /api/log
app.get('/api/log', (req, res) => {
    res.json({
        logs: [
            "2021-08-10T12:00:00Z: Feeding 100",
            "2021-08-10T12:00:00Z: Feeding 102",
            "2021-08-10T12:00:00Z: Feeding 101",
        ]
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

// 404 Error handler
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
