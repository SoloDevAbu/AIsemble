import expres from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import mainRouter from "./routes/route"

const app = expres();

app.use(cors());
app.use(cookieParser());
app.use(expres.json());
app.use(expres.urlencoded({ extended: true }));

app.use("/api/v1", mainRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
    console.log("Server is running on port 3000");
})