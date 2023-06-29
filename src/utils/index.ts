export const getMonthNamesForOneYear = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const monthNamesAndYears = [];

    for (let i = 0; i < 12; i++) {
        const monthIndex = (currentMonth + i) % 12;
        const year = currentYear + Math.floor((currentMonth + i) / 12);
        const month = new Date(year, monthIndex, 1)
            .toLocaleString('default', { month: 'long' });
        const monthNameAndYear = {month, year};
        monthNamesAndYears.push(monthNameAndYear);
    }

    return monthNamesAndYears;
}
