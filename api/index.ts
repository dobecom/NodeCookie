const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// Add the cookie parser middleware
app.use(cookieParser());

// Default route
app.get("/", (req, res) => {
    // Check for custom cookie
    let customCookie = req.cookies["custom-cookie"];

    if (!customCookie) {
        // Create a custom cookie
        customCookie = {
            id: new Date().getTime(), // Generate a simple ID (timestamp)
            views: 1                 // Initialize view count
        };

        // Set the cookie on the client
        res.cookie("custom-cookie", JSON.stringify(customCookie), {
            secure: true, // Ensure cookies are sent only over HTTPS
            path: "/",     // Make the cookie apply to all paths
            maxAge: 24 * 60 * 60 * 1000 // Valid for 1 day
        });
    } else {
        // Parse the cookie value and increment the view count
        customCookie = JSON.parse(customCookie);
        customCookie.views++;
        res.cookie("custom-cookie", JSON.stringify(customCookie), {
            secure: true,
            path: "/",
            maxAge: 24 * 60 * 60 * 1000
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
