const app = require("./app");
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  try {
    console.log(`Server running. Use our API on port: ${PORT}`)
  }
  catch (err) {
    console.log('cant connect')
 };
});
