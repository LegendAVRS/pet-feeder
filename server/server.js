const express = require("express");
const app = express();
var cors = require("cors");
app.use(express.json(), cors());

// Endpoint: /api/homeData
let homeData = {
    food: 100,
    water: 600,
    temp: 50,
    humid: 60,
    nextFeed: {
        id: 1,
        value: 50,
        time: "2040",
        isOn: true,
        duration: 5,
    },
    prevFeed: {
        id: 1,
        value: 50,
        time: "2040",
        isOn: true,
        duration: 5,
    },
    lastImg: {
        url: "https://media.istockphoto.com/id/937776750/photo/cat-eating-out-of-bowl.jpg?s=612x612&w=0&k=20&c=G5779rGIyUzKEkTL48JFKxqahbaWpj6d9G1y2Oi3Omg=",
        time: 1692000000,
    },
};

app.get("/api/homeData", (req, res) => {
    res.json(homeData);
});

// Endpoint: /api/gallery/
let images = [
    {
        url: "https://media.istockphoto.com/id/937776750/photo/cat-eating-out-of-bowl.jpg?s=612x612&w=0&k=20&c=G5779rGIyUzKEkTL48JFKxqahbaWpj6d9G1y2Oi3Omg=",
        time: 1692001000,
    },
    {
        url: "https://www.shutterstock.com/image-photo/cute-little-kitten-bowl-granules-260nw-508351093.jpg",
        time: 1692002000,
    },
    {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9t1dbd8CgFXw0FaKI4WxXPh_lK7-G2L25bQ&s",
        time: 1692002000,
    },
    {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9t1dbd8CgFXw0FaKI4WxXPh_lK7-G2L25bQ&s",
        time: 1652002000,
    },
    {
        url: "https://media.istockphoto.com/id/937776750/photo/cat-eating-out-of-bowl.jpg?s=612x612&w=0&k=20&c=G5779rGIyUzKEkTL48JFKxqahbaWpj6d9G1y2Oi3Omg=",
        time: 1612002000,
    },
    {
        url: "https://www.shutterstock.com/image-photo/cute-little-kitten-bowl-granules-260nw-508351093.jpg",
        time: 1612002000,
    },
    {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9t1dbd8CgFXw0FaKI4WxXPh_lK7-G2L25bQ&s",
        time: 1632002000,
    },
    {
        url: "https://www.shutterstock.com/image-photo/cute-little-kitten-bowl-granules-260nw-508351093.jpg",
        time: 1622002000,
    },
];

app.get("/api/image", (req, res) => {
    res.json({ images });
});

app.get("/api/video", (req, res) => {
    res.json({ videos: images });
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

app.post("/api/foodDrink/", (req, res) => {
    const { start, end } = req.body;
    const filterFeedList = feedList.filter(
        (item) => item.time >= start && item.time <= end
    );
    const filterWaterList = waterList.filter(
        (item) => item.time >= start && item.time <= end
    );
    console.log(filterFeedList);
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

app.post("/api/environment/", (req, res) => {
    // remember to filter based on time first
    // time is in year 2024
    const environmentHistory = [];
    // generate 10 different dates
    for (let i = 0; i < 10; i++) {
        const time = 1724006662 + i * 100000;
        environmentHistory.push({
            time,
            temperature: Math.floor(Math.random() * 1000) + 100,
            humidity: Math.floor(Math.random() * 1000) + 100,
        });
    }
    // console.log(environmentHistory);
    res.json({ environmentHistory });
});

// Endpoint: /api/schedule/
let schedule = [
    { id: 1, value: 50, time: "20:40:00", isOn: true, duration: 5 },
    { id: 2, value: 60, time: "10:00:00", isOn: false, duration: 10 },
];

app.get("/api/schedule", (req, res) => {
    // make time into something like 2040
    schedule = schedule.map((s) => {
        const time = s.time.split(":");
        const newTime = time[0] + time[1];
        return { ...s, time: newTime };
    });
    // sort by time (sort string string)
    schedule.sort((a, b) => a.time.localeCompare(b.time));
    res.json({ schedule });
});

// Endpoint: /api/schedule/ POST
app.post("/api/schedule", (req, res) => {
    const { value, time, isOn, duration } = req.body;
    const id = schedule.length + 1;
    schedule.push({ id, value, time, isOn, duration });
    console.log(schedule);
    res.json(true);
});

// Endpoint: /api/schedule/:id UPDATE
app.post("/api/schedule/:id", (req, res) => {
    const { id } = req.params;
    const { value, time, isOn, duration } = req.body;
    console.log(id);
    const chosenSchedule = schedule.findIndex((s) => s.id == id);
    if (schedule) {
        schedule[chosenSchedule].value = value;
        schedule[chosenSchedule].time = time;
        schedule[chosenSchedule].isOn = isOn;
        schedule[chosenSchedule].duration = duration;
        console.log(schedule);
        res.json(true);
    } else {
        res.status(404).json({ error: "Schedule not found" });
    }
});

// Endpoint: /api/schedule/:id DELETE
app.delete("/api/schedule/:id", (req, res) => {
    const { id } = req.params;
    const index = schedule.findIndex((s) => s.id == id);
    if (index !== -1) {
        schedule.splice(index, 1);
        res.json(true);
    } else {
        res.status(404).json({ error: "Schedule not found" });
    }
});

// Endpoint: /api/camera
app.get("/api/camera", (req, res) => {
    res.json({
        url: "https://www.youtube.com/embed/xVKVYIjmXCU",
        time: 12312382232,
    });
});

// Endpoint: /api/feedNow
app.post("/api/feedNow", (req, res) => {
    res.json(true);
});

// Endpoint: /api/restart
app.post("/api/restart", (req, res) => {
    res.json(true);
});

// Endpoint: /api/status
app.get("/api/status", (req, res) => {
    res.json({
        software: "0.10.0-alpha",
        ip: "192.168.1.2",
        board: "esp32",
        wifi: "Wokwi-GUEST",
    });
});

// Endpoint: /api/log
app.get("/api/log", (req, res) => {
    res.json({
        logs: [
            "2021-08-10T12:00:00Z: Feeding 100",
            "2021-08-10T12:00:00Z: Feeding 102",
            "2021-08-10T12:00:00Z: Feeding 101",
            "2021-08-10T12:00:00Z: Feeding 100",
            "2021-08-10T12:00:00Z: Feeding 102",
            "2021-08-10T12:00:00Z: Feeding 101",
            "2021-08-10T12:00:00Z: Feeding 100",
            "2021-08-10T12:00:00Z: Feeding 102",
            "2021-08-10T12:00:00Z: Feeding 101",
        ],
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
