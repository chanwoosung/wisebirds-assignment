export const formatDateTime = (date:string) => {
    const newDate = new Date(date)
    newDate.setHours(newDate.getHours() +9)
    return newDate.toISOString().replace('T', ' ').substring(0, 19)
}