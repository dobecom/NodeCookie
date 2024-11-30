import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

// Add the cookie parser middleware
app.use(cookieParser());

// Default route
app.get('/', (req, res) => {
    // Check for custom cookie
    let customCookie = req.cookies['custom-cookie'];

    if (!customCookie) {
        // Create a custom cookie
        customCookie = {
            id: new Date().getTime(), // Generate a simple ID (timestamp)
            views: 1                 // Initialize view count
        };

        // Set the cookie on the client
        res.cookie('custom-cookie', JSON.stringify(customCookie), {
            httpOnly: true,
            secure: false, // Set to true in an HTTPS environment
            path: '/',     // Make the cookie apply to all paths
            maxAge: 24 * 60 * 60 * 1000 // Valid for 1 day
        });
    } else {
        // Parse the cookie value and increment the view count
        customCookie = JSON.parse(customCookie);
        customCookie.views++;
        res.cookie('custom-cookie', JSON.stringify(customCookie), {
            httpOnly: true,
            secure: false,
            path: '/',
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
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
