## Cross-Browser Cookie Sharing Test

This project is a minimal Node.js setup designed to test cookie sharing between browsers, such as between **IE Mode in Edge** and **Microsoft Edge**. The server tracks user visits and stores the data in a custom cookie named `custom-cookie`.

### Purpose

To verify whether cookies can be shared seamlessly across different browser environments (e.g., Edge and IE Mode) using a simple Node.js server.

### Usage

1. Start the server:
   ```bash
   npm run start
   ```

2. Access the server in a browser:
   ```
   http://localhost:3000
   ```

3. Use browser tools or developer tools to inspect cookies and verify whether they are shared across different browser modes.

### Notes

- This project uses a custom cookie with the name `custom-cookie`.
- Ensure proper configuration of browser policies and settings (e.g., Enterprise Site List in Edge) for testing cross-browser cookie sharing.
