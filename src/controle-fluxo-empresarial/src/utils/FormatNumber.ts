export const formatNumber2 = Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2
}).format;

export const formatNumber4 = Intl.NumberFormat(undefined, {
    minimumFractionDigits: 4
});

export const formatDataWithHour = (data: Date) => {
    return new Date(data).toLocaleString(undefined, {
        day: "numeric",
        month: "numeric",
        year: "numeric",

        hour: "numeric",
        minute: "numeric"
    })
}

export const formatData = (data: Date) => {
    return new Date(data).toLocaleString(undefined, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    })
}