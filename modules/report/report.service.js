const TimeEntry = require("./../time-entry/timeEntry.model");


exports.getWeeklyReport = async (data) => {
    let startDate = new Date(data.startDate);
    startDate.setUTCHours(0, 0, 0, 0);

    let endDate = new Date(data.endDate);
    endDate.setUTCHours(23, 59, 59, 999);

     const leaderboard = await TimeEntry.aggregate([
       {
         $match: {
           startTime: { $gte: startDate, $lte: endDate },
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
           totalMinutes: 1,
         },
       },
       { $sort: { totalMinutes: -1 } },
     ]);

     leaderboard.forEach((user, index) => {
       user.rank = index + 1;
     });

       return {
         success: true,
         weekStart: startDate,
         weekEnd: endDate,
         leaderboard,
       };
}


exports.getDailyReport = async (data) => {
  let startOfDay = new Date(data.day);
  startOfDay.setUTCHours(0, 0, 0, 0);
    let endOfDay = new Date(data.day);
    endOfDay.setUTCHours(23, 59, 59, 999);


  const leaderboard = await TimeEntry.aggregate([
    {
      $match: {
        startTime: { $gte: startOfDay, $lte: endOfDay },
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
        totalMinutes: 1,
      },
    },
    { $sort: { totalMinutes: -1 } },
  ]);

  leaderboard.forEach((user, index) => {
    user.rank = index + 1;
  });

  return {
    success: true,
    day: startOfDay,
    leaderboard,
  };
};