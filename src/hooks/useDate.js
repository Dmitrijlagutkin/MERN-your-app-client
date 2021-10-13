export const useDate = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];

    const date = new Date();
    const month = date.getUTCMonth()
    const day = date.getDate()
    const year = date.getFullYear()

    const fullDate = `${monthNames[month]} ${day},${year}`
    return fullDate
}