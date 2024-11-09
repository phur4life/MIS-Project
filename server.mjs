import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    // Listen for membership applications
    socket.on("applyForMembership", (data) => {
      console.log("Membership application received:", data);
      // Notify all admins about the new application
      io.emit("newApplication", data);
    });

    // Handle admin response to application
    socket.on("respondToApplication", (response) => {
      console.log("Admin response:", response);
      const { userId, action } = response;
      // Notify the specific user about the admin's decision
      socket.broadcast.emit("applicationResponse", { userId, action });
    });

    socket.on("disconnect", () => {
      console.log("A client disconnected:", socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});