const appError = require("../../utils/appError");
const TimeEntry = require("./timeEntry.model");

exports.startTime = async (data, userId) => {
  const { title, description } = data;

  const startTime = new Date(Date.now());
  console.log(startTime);

  const timeEntry = await TimeEntry.create({
    userId,
    title,
    description,
    startTime,
  });

  return {
    success: true,
    timeEntry: {
      id: timeEntry._id,
      title: timeEntry.title,
      description: timeEntry.description,
      startTime: timeEntry.startTime,
    },
  };
};

exports.stopTime = async (timeId) => {
  const time = await TimeEntry.findOne({ _id: timeId });

  if (!time) {
    appError("Time not found", 404);
  }
  const endTime = new Date(Date.now());

  time.endTime = endTime;

  await time.save();

  return {
    success: true,
    timeEntry: {
      id: time._id,
      title: time.title,
      description: time.description,
      startTime: time.startTime,
      endTime: time.endTime,
      durationMinutes: time.durationMinutes,
    },
  };
};

exports.setManualTime = async (data, userId) => {
  const { startTime, endTime, title, description } = data;

  const time = await TimeEntry.create({
    userId,
    title,
    description,
    startTime,
    endTime,
  });

  return {
    success: true,
    timeEntry: {
      id: time._id,
      title: time.title,
      description: time.description,
      startTime: time.startTime,
      endTime: time.endTime,
      durationMinutes: time.durationMinutes,
    },
  };
};

exports.getMyTimes = async (userId, query) => {
  const todayStr = new Date().toISOString().split("T")[0];

  if (query.day > todayStr) {
    throw appError("You cannot select a future date", 400);
  }

  const startOfDay = new Date(query.day);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(query.day);
  endOfDay.setHours(23, 59, 59, 999);

  const myTimes = await TimeEntry.find(
    { userId, createdAt: { $gte: startOfDay, $lte: endOfDay } },
    "-__v -userId"
  ).lean();

  return {
    success: true,
    times: myTimes,
  };
};

exports.getUsersTimes = async (userId , query) => {
  const todayStr = new Date().toISOString().split("T")[0];

  if (query.day > todayStr) {
    throw appError("You cannot select a future date", 400);
  }

  const startOfDay = new Date(query.day);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(query.day);
  endOfDay.setHours(23, 59, 59, 999);

  const myTimes = await TimeEntry.find(
    { userId, createdAt: { $gte: startOfDay, $lte: endOfDay } },
    "-__v -userId"
  ).lean();

  return {
    success: true,
    times: myTimes,
  };
}

exports.removeTime = async (userId , timeId) => {

  const time = await TimeEntry.findOneAndDelete({_id: timeId , userId}).lean()

  if(!time){
    appError("Time not found")
  }

  return {
    success: true,
    message: "Time removed successfully"
  }
}

exports.editTime = async (userId, timeId , data) => {
  const foundTime = await TimeEntry.findOne({userId , _id: timeId}).lean();

  if (!foundTime) {
    appError("Time not found");
  }

      const diffMs = new Date(data.endTime) - new Date(data.startTime);
      const durationMinutes = Math.round(diffMs / 1000 / 60);

  const time = await TimeEntry.findOneAndUpdate(
    { _id: timeId, userId },
    {
      title: data.title,
      description: data.description,
      startTime: data.startTime,
      endTime: data.editTime,
      durationMinutes,
    }, {
      new: true
    }
  );

  return {
    success: true,
    entryTime: {
      id: time._id,
      title: time.title,
      description: time.description,
      startTime: time.startTime,
      endTime: time.endTime,
      durationMinutes: time.durationMinutes,
    },
  };
};