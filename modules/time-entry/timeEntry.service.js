const { default: mongoose } = require("mongoose");
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
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(query.day);
  endOfDay.setUTCHours(23, 59, 59, 999);


  const objectUserId = new mongoose.Types.ObjectId(userId);

    const myTimes = await TimeEntry.aggregate([
      {
        $match: {
          startTime: { $gte: startOfDay, $lte: endOfDay },
          userId: objectUserId,
        },
      },
      {
        $group: {
          _id: "$userId",
          totalMinutes: { $sum: "$durationMinutes" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          name: "$user.name",
          email: "$user.email",
          totalMinutes: 1,
        },
      },
    ]);


    const tasks = await TimeEntry.find({userId , startTime : {$gte : startOfDay , $lte : endOfDay}} , "-__v")

  return {
    success: true,
    times: myTimes,
    totalMinutes: myTimes.length > 0 ? myTimes[0].totalMinutes : 0,
    tasks
  };
};

exports.getUsersTimes = async (userId , query) => {
  const todayStr = new Date().toISOString().split("T")[0];

  if (query.day > todayStr) {
    throw appError("You cannot select a future date", 400);
  }

  const startOfDay = new Date(query.day);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(query.day);
  endOfDay.setUTCHours(23, 59, 59, 999);

  const objectUserId = new mongoose.Types.ObjectId(userId);

  const myTimes = await TimeEntry.aggregate([
    {
      $match: {
        startTime: { $gte: startOfDay, $lte: endOfDay },
        userId: objectUserId,
      },
    },
    {
      $group: {
        _id: "$userId",
        totalMinutes: { $sum: "$durationMinutes" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 0,
        userId: "$user._id",
        name: "$user.name",
        email: "$user.email",
        totalMinutes: 1,
      },
    },
  ]);

  const tasks = await TimeEntry.find(
    { userId, startTime: { $gte: startOfDay, $lte: endOfDay } },
    "-__v"
  );

  return {
    success: true,
    times: myTimes,
    totalMinutes: myTimes.length > 0 ? myTimes[0].totalMinutes : 0,
    tasks
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
      endTime: data.endTime,
      durationMinutes,
    }, {
      new: true
    }
  );


  console.log(time);

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

