export async function getService(endpoint) {
    const url = new URL(endpoint, process.env.NEXT_PUBLIC_APP_URL);

    console.log(url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Service request failed: ${response.status} ${response.statusText}`
        );
    }

    return response.json();
}