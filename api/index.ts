const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// Add the cookie parser middleware
app.use(cookieParser());

// Default route
app.get("/", (req, res) => {
    // Check for custom cookie
    let customCookie = req.cookies["cookie1"];

    console.log(customCookie)
    if (!customCookie) {
        // Create a custom cookie
        customCookie = {
            id: new Date().getTime(), // Generate a simple ID (timestamp)
            views: 1                 // Initialize view count
        };

        // Set the cookie on the client
        res.cookie("cookie1", JSON.stringify(customCookie), {
            secure: true, // Ensure cookies are sent only over HTTPS
            path: "/",     // Make the cookie apply to all paths
            // maxAge: 30 * 60 * 1000 // comment this for persistent cookie
        });
    } else {
        // Parse the cookie value and increment the view count
        customCookie = JSON.parse(customCookie);
        customCookie.views++;
        res.cookie("cookie1", JSON.stringify(customCookie), {
            secure: true,
            path: "/",
            // maxAge: 30 * 60 * 1000 // comment this for persistent cookie
        });
    }

    // Respond to the client
    res.send(`
    <h1>Welcome to Custom Cookie Example</h1>
    <p>Number of views: ${customCookie.views}</p>
    <p>Cookie Data: ${req.headers.cookie}</p>
  `);
});

// Start the server
app.listen(3000, () => {
    console.log("Server ready on port 3000.");
});

module.exports = app;
