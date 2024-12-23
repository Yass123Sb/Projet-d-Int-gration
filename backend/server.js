const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); //
dotenv.config({ path: "./.env" });
const cookieParser = require("cookie-parser");


const authRoutes = require("./routes/auth.route.js");
const quizRoutes = require("./routes/quiz.route");
const resultRoutes = require("./routes/result.route.js");
const jobRoutes = require("./routes/job.route");
const offerRoutes = require("./routes/offer.route");



const { connectDB } = require("./lib/db.js");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin: "*", 
    credentials: true,
}));
app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/offer", offerRoutes);


app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});
