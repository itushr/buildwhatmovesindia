import { WebSocketServer } from "ws";
import { integrated_module } from "./modules/integrated_module.js";

let wss = null;
let activeConnections = 0;

export function startWebSocketServer() {
    if (wss) return;

    const port = parseInt(process.env.PORT || "3001", 10);

    try {
        wss = new WebSocketServer({
            port,
            host: "0.0.0.0",
        });

        console.log(`WebSocket server started on ${port}`);

        wss.on("connection", (ws) => {
            activeConnections++;

            console.log(`joined, live count: ${activeConnections}`);

            ws.on("message", async (message) => {
                try {
                    const payload = JSON.parse(message);

                    if (payload.type === "ask" && payload.query) {
                        const query = payload.query;

                        const result = await integrated_module(
                            query,
                            (step, status, details) => {
                                try {
                                    if (ws.readyState === ws.OPEN) {
                                        ws.send(
                                            JSON.stringify({
                                                type: "progress",
                                                step,
                                                status,
                                                details,
                                            })
                                        );
                                    }
                                } catch (e) {
                                    console.error(
                                        "Error sending progress update:",
                                        e
                                    );
                                }
                            }
                        );

                        if (ws.readyState === ws.OPEN) {
                            ws.send(
                                JSON.stringify({
                                    type: "done",
                                    result,
                                    historyId: result?._history_id,
                                })
                            );
                        }
                    }
                } catch (error) {
                    console.error(
                        "Error processing websocket message:",
                        error
                    );

                    try {
                        if (ws.readyState === ws.OPEN) {
                            ws.send(
                                JSON.stringify({
                                    type: "error",
                                    error:
                                        error.message ||
                                        "Error occurred while processing query",
                                    historyId: error.historyId,
                                })
                            );
                        }
                    } catch (e) {
                        console.error(
                            "Error sending error message:",
                            e
                        );
                    }
                }
            });

            ws.on("close", () => {
                activeConnections--;

                console.log(
                    `left, live count: ${activeConnections}`
                );
            });

            ws.on("error", (error) => {
                console.error(
                    "WebSocket connection error:",
                    error
                );
            });
        });

        wss.on("error", (error) => {
            console.error("WebSocket server error:", error);
        });
    } catch (err) {
        console.error("Failed to start WebSocket server:", err);
    }
}