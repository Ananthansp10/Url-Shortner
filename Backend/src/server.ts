import app from "./app";
import db from "./config/databaseConfig";
const port = process.env.PORT;

db();

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
