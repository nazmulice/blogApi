const app = require("./app");
require("dotenv");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server run at port ${PORT}`);
});
