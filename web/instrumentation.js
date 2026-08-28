export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { startWebSocketServer } = await import('./ws-server.js');
        startWebSocketServer();
    }
}
