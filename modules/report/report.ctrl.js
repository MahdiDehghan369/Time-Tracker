const reportService = require('./report.service');

exports.getWeeklyReport = async (req, res, next) => {
    try {
        const result = await reportService.getWeeklyReport(req.query)
        return res.status(200).json(result)
        
    } catch (error) {
        next(error)
    }
}

exports.getDailyReport = async (req, res, next) => {
  try {
    const result = await reportService.getDailyReport(req.query);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};