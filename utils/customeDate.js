const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday", 
    "Wenesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const getWeekDay = date => {
    return DAYS[new Date(date *  1000).getDay()];
};

export {getWeekDay};