// Synchronous function using Promise
function syncFunction() {
    return new Promise((resolve, reject) => {
        const result = doSomeSynchronousWork();
        if (result) {
            resolve(result);
        } else {
            reject(new Error("Something went wrong"));
        }
    });
}

try {
    const syncResult = await syncFunction();
    console.log(syncResult);
} catch (error) {
    console.error(error);
}
