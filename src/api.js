const HOST = process.env.NODE_ENV === "production" ? document.location.origin + ":8080" : "http://192.168.1.16:8080";

export const portalBanned = async () => new Promise((resolve, reject) => {

    fetch(HOST + "/portal/banned", {
        method: "GET"
    }).then((res) => {
        if (res.ok) res.json().then((res) => {
            delete res.code;
            resolve(res);
        }).catch((error) => reject(error));
        else res.json().then((res) => reject(res.message)).catch((error) => reject(error));
    }).catch((error) => reject(error));
});

export const portalRegister = async (firstName) => new Promise((resolve, reject) => {

    fetch(HOST + "/portal/register", {
        method: "POST",
        body: JSON.stringify({ firstName })
    }).then((res) => {
        if (res.ok) resolve();
        else res.json().then((res) => reject(res.message)).catch((error) => reject(error));
    }).catch((error) => reject(error));
});
