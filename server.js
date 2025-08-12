const app = require("./app");
const connectToDB = require("./config/db");

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://127.0.0.1:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};


startServer()
