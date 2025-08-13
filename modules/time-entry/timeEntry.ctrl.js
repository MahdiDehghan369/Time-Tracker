const timeEntryService = require("./timeEntry.service");
const validateObjectId = require("./../../utils/validateObjectId");

exports.startTime = async (req, res, next) => {
  try {
    const userId = req?.user?.id;
    const result = await timeEntryService.startTime(req.body, userId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.stopTime = async (req, res, next) => {
  const { timeId } = req.params;
  validateObjectId(timeId, "Time");

  const result = await timeEntryService.stopTime(timeId);
  return res.status(200).json(result);
};

exports.setManualTime = async (req, res, next) => {
  try {
    const userId = req?.user?.id;
    const result = await timeEntryService.setManualTime(req.body, userId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getMyTimes = async (req, res, next) => {
  try {
    const userId = req?.user?.id;
    let query = {};

    if (req.query.day) {
      query.day = req.query.day;
    }

    const result = await timeEntryService.getMyTimes(userId, query);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getUsersTimes = async (req, res, next) => {
  try {
    const { userId } = req.params;
    validateObjectId(userId, "User");

    let query = {};

    if (req.query.day) {
      query.day = req.query.day;
    }

    const result = await timeEntryService.getUsersTimes(userId, query);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.removeTime = async (req, res, next) => {
  try {
    const { timeId } = req.params;
    validateObjectId(timeId, "Time");
    const userId = req?.user?.id;

    const result = await timeEntryService.removeTime(userId, timeId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


exports.editTime = async (req, res, next) => {
  try {
    const { timeId } = req.params;
    validateObjectId(timeId, "Time");
    const userId = req?.user?.id;

    const result = await timeEntryService.editTime(userId, timeId , req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};