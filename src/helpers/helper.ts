const dateNow = () => {
    var today = new Date();

    const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
    };

    const time = today.toLocaleString("es-CO", options);
    return time;
};

const uniqueID = (): string => {
    const date = Date.now().toString(32);
    const number = Math.random().toString(32).substring(2);

    return number + date;
};

export { dateNow, uniqueID };
