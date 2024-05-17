const express = require('express');
const barrel = require('./routes/index.js');
const PORT = process.env.PORT || 3001;
 // dynamically set the port
const app = express();

// Express middleware will always run the operation in the order from top to bottom "order matters"
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use("/",html_routes);
app.use("./route", barrel);



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});