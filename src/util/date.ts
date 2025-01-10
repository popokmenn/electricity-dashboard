export const getFilterDateRange = (filterType: string, isSecond: boolean = false) => {
    const now = new Date();
    let startDate, endDate;

    switch (filterType) {
        case 'Daily':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            break;
        case 'Weekly':
            const dayOfWeek = now.getDay();
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - dayOfWeek));
            break;
        case 'Monthly':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            break;
        // Add more cases as needed
        default:
            throw new Error(`Unknown filter type: ${filterType}`);
    }
    if (isSecond) {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0).getTime() / 1000;
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime() / 1000;
    }
    return { startDate, endDate };
};
