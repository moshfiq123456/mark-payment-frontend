import moment from "moment"

export const FormatDate = (date) => {
    date = moment(date).format("DD")
    return date
}

export const FormatMonth = (month) => {
    month = moment(month).format("MM")
    return month
}

export const FormatYear = (year) => {
    year = moment(year).format("YYYY")
    return year
}

