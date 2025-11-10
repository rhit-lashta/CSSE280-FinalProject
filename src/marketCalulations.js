let monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
let monthDays = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
];


export function getPriceWidget(allTypes, type, timeSpan) {

    let items = null;
    for (let i = 0; i < allTypes.length; i++) {
        if (allTypes[i][0] == type) {
            items = allTypes[i][1]
        }

    }

    let currentDate = new Date();
    let year = currentDate.getFullYear(); 
    let month = currentDate.getMonth(); 
    let day = currentDate.getDate();

    if (timeSpan > 1) {
        return getPriceWidgetMonths(items, timeSpan, day, month, year)
    }
    else {
        return getPriceWidgetDays(items, timeSpan, day, month, year)
    }

    
}

function getPriceWidgetMonths(items, timeSpan, day, month, year) {
    let dateAverages = {}

    let barGraphXAxis = []

    let currentMonth = month;
    let currentYear = year;
    for (let i = 0; i < timeSpan; i++) {
        let dateKey = monthNames[currentMonth] + " - " + currentYear;
        barGraphXAxis.unshift(dateKey)
        currentMonth -= 1;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear -= 1;
        }
    }
    

    let oldestYear = year - Math.floor(timeSpan / 12)
    let newTimeSpan = timeSpan - Math.floor(timeSpan / 12) * 12

    let oldestMonth = month - newTimeSpan;
    if (oldestMonth <= 0) {
        oldestMonth += 12;
        oldestYear -= 1;
    }
    
    let dateAveragePrices = [barGraphXAxis.length]

    let itemWidget = [0, barGraphXAxis, dateAveragePrices];
    // [Average Price, Dates, AveragePrice Per Dates] //
    let totalPrice = 0;
    let totalItems = 0;

    for (let item in items) {
        
        let itemData = items[item]
        let itemDate = itemData["dataMain"]
        let dateParts = itemDate.split("/");
        // [Month, Day, Year] //
        if ((dateParts[2] > oldestYear) ||
            (dateParts[2] == oldestYear && dateParts[0] > oldestMonth + 1)) {
            totalItems += 1;
            totalPrice += itemData["sold"]

            let dateKey = monthNames[dateParts[0] - 1] + " - " + dateParts[2];
            if (dateKey in dateAverages) {
                let dateAverage = dateAverages[dateKey]
                dateAverage[0] += itemData["sold"];
                dateAverage[1] += 1;
            }
            else {
                dateAverages[dateKey] = [itemData["sold"], 1]
            }
            
        }
    }
        
    for (let i = 0; i < barGraphXAxis.length; i++) {

        if (barGraphXAxis[i] in dateAverages) {
            let dateSales = dateAverages[barGraphXAxis[i]];
            let avgPrice = dateSales[0] / dateSales[1];
            dateAveragePrices[i] = avgPrice;
        }
        else {
            dateAveragePrices[i] = 0;
        }
    }
        
    itemWidget[0] = totalPrice / totalItems;

    return itemWidget
}

function getPriceWidgetDays(items, timeSpan, day, month, year) {
    
    let timeSpanDays = Math.floor(30 * timeSpan);

    let lastMonth = month - 1;
    if (lastMonth <= 0) {
        lastMonth = 12;
        
    }

    let barGraphXAxis = []
    let currentDay = day;
    let currentMonth = month;
    for (let i = 0; i < timeSpanDays; i++) {
        let dateKey = monthNames[currentMonth] + " - " + currentDay;
        barGraphXAxis.unshift(dateKey);
        currentDay -= 1;
        if (currentDay <= 0) {
            currentDay = monthDays[lastMonth - 1];
            currentMonth = lastMonth;
        }
    }

    let oldestYear = year;
    let oldestMonth = month;
    let oldestDay = day - timeSpanDays;

    if (oldestDay <= 0) {
        oldestMonth = lastMonth
        if (oldestMonth == 12) {
            oldestYear -= 1;
        }
        oldestDay += monthDays[oldestMonth - 1];
    }

    

    //month -= newTimeSpan;
    //if (month <= 0) {
    //    month += 12;
    //    year -= 1;
    //}
    
    let dateAverages = {}
    let dateAveragePrices = [barGraphXAxis.length]

    for (let i = 0; i < barGraphXAxis.length; i++) {
        dateAveragePrices[i] = 0;
    }

    let itemWidget = [0, barGraphXAxis, dateAveragePrices];

    //return itemWidget;
    // [Average Price, Dates, AveragePrice Per Dates] //
    let totalPrice = 0;
    let totalItems = 0;

    for (let item in items) {
        
        let itemData = items[item]
        let itemDate = itemData["dataMain"]
        let dateParts = itemDate.split("/");
        for (let i = 0; i < dateParts.length; i++) {
            dateParts[i] = parseInt(dateParts[i])
        }

        // [Month, Day, Year] //
        if ((dateParts[2] > oldestYear) ||
            (dateParts[2] == oldestYear && dateParts[0] > oldestMonth + 1) || 
            (dateParts[2] == oldestYear && dateParts[0] == oldestMonth + 1 && dateParts[1] >= oldestDay + 1)) {
            totalItems += 1;
            totalPrice += itemData["sold"]

            let dateKey = monthNames[dateParts[0] - 1] + " - " + dateParts[1];
            if (dateKey in dateAverages) {
                let dateAverage = dateAverages[dateKey]
                dateAverage[0] += itemData["sold"];
                dateAverage[1] += 1;
            }
            else {
                dateAverages[dateKey] = [itemData["sold"], 1]
            }
            
        }
    }
        
    for (let i = 0; i < barGraphXAxis.length; i++) {

        if (barGraphXAxis[i] in dateAverages) {
            let dateSales = dateAverages[barGraphXAxis[i]];
            let avgPrice = dateSales[0] / dateSales[1];
            dateAveragePrices[i] = avgPrice;
        }
        else {
            dateAveragePrices[i] = 0;
        }
    }
        
    itemWidget[0] = totalPrice / totalItems;

    return itemWidget
}