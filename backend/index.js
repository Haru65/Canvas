import express from "express";
import axios from "axios";
import cors from "cors";

 // Ensure file has `.js` extension
import router from "./routes/routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}))



//routing 
app.use("/" ,router)



app.listen(3001, () => {
    console.log("Server started on port 3001");
});
