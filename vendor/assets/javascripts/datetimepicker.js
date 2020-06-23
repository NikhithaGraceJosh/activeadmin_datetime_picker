const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const FULL_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const FULL_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
/* 
    Initialising variables that store the final date that the user picks
    Note:
        finalDate.date is initialised to -1 so that if the user doesn't pick any date, the input field is left blank
*/

let date = new Date()
let viewingDate = {
    date: -1,
    month: date.getMonth(),
    year: date.getFullYear()
}
let finalDate = Object.assign({}, viewingDate)
let time = date.toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ')
let finaltimeHour = time[0]
let finaltimeMinute = date.getMinutes();
let finaltimePeriod = time[1]
let default_options = {
    'min_date': -1,
    'max_date': -1,
    'format': '%dd-%mm-%yyyy %hh:%MM:%SS %P'
};
let datetimepicker_options;
$(function () {

    //initialize datetimepicker options
    options = $('.ui-datetime-picker-wrapper > .ui-datetime-picker-input').attr('datetimepicker_options')
    datetimepicker_options = { ...default_options, ...($.parseJSON(options)) }

    // give default values to the global variables depending on the value of the input field
    $.map($('.ui-datetime-picker-wrapper > .ui-datetime-picker-input'), function (d) {
        if ($(d).val() != "") {
            let val = $(d).val()

            // for firefox browser
            val = val.replace(' UTC', '')

            date = new Date(val)
            finalDate.month = date.getMonth();
            finalDate.year = date.getFullYear();
            finalDate.date = date.getDate();
            let time = date.toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ')
            finaltimeHour = time[0];
            finaltimeMinute = date.getMinutes();
            finaltimePeriod = time[1]
            viewingDate = Object.assign({}, finalDate)
            let formatted_date = formatDate(viewingDate)
            $(d).val(formatted_date)
        }
    })
    /*
        Binding event to all datepicker inputs
        On focus datetimepicker inputs, display datetime picker
    */
    $(document).on('focus', '.ui-datetime-picker-wrapper > .ui-datetime-picker-input', function (e) {
        if ($(e.target).siblings('div.datetimepicker-container').length == 0) {
            // display datetimepicker
            initDateTimePicker(this)
        }
    })

    $(document).on('click', '.datetimepicker-container .header.datepicker .select-month', function () {
        //display month picker
        displayMonthPicker();
        $('.datetimepicker-container .footer').hide()
    })

    $(document).on('click', '.datetimepicker-container .body.monthpicker .month-container div', function () {
        let min_date = new Date(datetimepicker_options['min_date'])
        let max_date = new Date(datetimepicker_options['max_date'])
        selected_month = parseInt($(this)[0].className)
        viewingDate.month = selected_month

        // display calendar
        displayCalendar(selected_month, finalDate.year)

        //show footer
        $('.datetimepicker-container .footer').show()
    })

    $(document).on('click', '.datetimepicker-container .header.datepicker .previous-month', function () {
        let current_month = $('.datetimepicker-container .header.datepicker .select-month span')[0].className
        // get the previous value of current month
        if (current_month == 0) {
            previous_month = 11
            previous_year = parseInt($('.select-year').text()) - 1
        }
        else {
            previous_month = current_month - 1
            previous_year = parseInt($('.select-year').text())
        }

        // save the month and year
        let min_date = new Date(datetimepicker_options['min_date'])
        let max_date = new Date(datetimepicker_options['max_date'])

        viewingDate.month = previous_month
        viewingDate.year = previous_year

        // display calendar
        displayCalendar(viewingDate.month, viewingDate.year)
    })

    $(document).on('click', '.datetimepicker-container .header.datepicker .next-month', function () {
        let current_month = $('.datetimepicker-container .header.datepicker .select-month span')[0].className
        // get the next value of current month
        if (current_month == 11) {
            next_month = 0
            next_year = parseInt($('.select-year').text()) + 1
        } else {
            next_month = parseInt(current_month) + 1
            next_year = parseInt($('.select-year').text())
        }
        //save the month and year
        let min_date = new Date(datetimepicker_options['min_date'])
        let max_date = new Date(datetimepicker_options['max_date'])

        viewingDate.month = next_month
        viewingDate.year = next_year

        // display calendar
        displayCalendar(viewingDate.month, viewingDate.year)
    })

    $(document).on('click', '.datetimepicker-container .header.datepicker .next-year', function () {
        let year = $('.datetimepicker-container .header.datepicker .select-year').text()
        next_year = parseInt(year) + 1

        //save the year
        let min_date = new Date(datetimepicker_options['min_date'])
        let max_date = new Date(datetimepicker_options['max_date'])

        viewingDate.year = next_year

        // display calendar
        displayCalendar(viewingDate.month, viewingDate.year)
    })

    $(document).on('click', '.datetimepicker-container .header.datepicker .previous-year', function () {
        let year = $('.datetimepicker-container .header.datepicker .select-year').text()
        let previous_year = parseInt(year) - 1

        //save the year
        let min_date = new Date(datetimepicker_options['min_date'])
        let max_date = new Date(datetimepicker_options['max_date'])

        viewingDate.year = previous_year
        // display calendar
        displayCalendar(viewingDate.month, viewingDate.year)
    })

    $(document).on('click', '.datetimepicker-container .header.datepicker .select-year', function () {
        // display year picker
        displayYearPicker()

        //hide footer
        $('.datetimepicker-container .footer').hide()
    })

    $(document).on('click', '.datetimepicker-container .body.yearpicker .year-container div', function () {
        //selected year
        let selected_year = $(this).text()

        //saved the selected year
        let min_date = new Date(datetimepicker_options['min_date'])
        let max_date = new Date(datetimepicker_options['max_date'])

        viewingDate.year = selected_year
        //display calendar
        displayCalendar(viewingDate.month, viewingDate.year)

        //show footer
        $('.datetimepicker-container .footer').show()
    })

    $(document).on('click', '.datetimepicker-container .header.yearpicker .previous-dozen-years', function () {
        displayPreviousDozenYears()
    })

    $(document).on('click', '.datetimepicker-container .header.yearpicker .next-dozen-years', function () {
        displayNextDozenYears()
    })

    $(document).on('click', '.datetimepicker-container .footer .toggle', function () {
        toggleDateTimePickers()
    })

    $(document).on('focusout', '.datetimepicker-container .body.timepicker .time-container .hour', function () {
        finaltimeHour = $(this).val()
    })

    $(document).on('focusout', '.datetimepicker-container .body.timepicker .time-container .minute', function () {
        finaltimeMinute = $(this).val()
    })

    $(document).on('click', '.datetimepicker-container .body.timepicker .time-container .hour-container .previous-hour', function () {
        if (finaltimeHour == 0) {
            finaltimeHour = 12
        } else {
            finaltimeHour = finaltimeHour - 1
        }
        $('.datetimepicker-container .body.timepicker .time-container .hour').text(finaltimeHour)
    })

    $(document).on('click', '.datetimepicker-container .body.timepicker .time-container .hour-container .next-hour', function () {
        if (finaltimeHour == 12) {
            finaltimeHour = 0
        } else {
            finaltimeHour = parseInt(finaltimeHour) + 1
        }
        $('.datetimepicker-container .body.timepicker .time-container .hour').text(finaltimeHour)
    })

    $(document).on('click', '.datetimepicker-container .body.timepicker .time-container .minute-container .previous-minute', function () {
        if (finaltimeMinute == 0) {
            finaltimeMinute = 60
        } else {
            finaltimeMinute = finaltimeMinute - 1
        }
        $('.datetimepicker-container .body.timepicker .time-container .minute').text(finaltimeMinute)
    })

    $(document).on('click', '.datetimepicker-container .body.timepicker .time-container .minute-container .next-minute', function () {
        if (finaltimeMinute == 60) {
            finaltimeMinute = 0
        } else {
            finaltimeMinute = parseInt(finaltimeMinute) + 1
        }
        $('.datetimepicker-container .body.timepicker .time-container .minute').text(finaltimeMinute)
    })

    $(document).on('click', '.datetimepicker-container .body.timepicker .time-container .hour', function () {
        displayHourPicker()
        $('.datetimepicker-container .footer').hide()
    })

    $(document).on('click', '.datetimepicker-container .body.timepicker .time-container .minute', function () {
        displayMinutePicker()
        $('.datetimepicker-container .footer').hide()
    })

    $(document).on('click', '.datetimepicker-container .body.hourpicker .hour-container div', function () {
        //save the selected month value
        finaltimeHour = $(this).text()

        // display calendar
        displayTimePicker()

        //show footer
        $('.datetimepicker-container .footer').show()
    })

    $(document).on('click', '.datetimepicker-container .body.minutepicker .minute-container div', function () {
        //save the selected month value
        finaltimeMinute = $(this).text()

        // display calendar
        displayTimePicker()

        //show footer
        $('.datetimepicker-container .footer').show()
    })

    $(document).on('click', '.datetimepicker-container .body.timepicker .toggle-am-pm', function () {
        //save the selected month value
        if (finaltimePeriod == "AM") {
            finaltimePeriod = "PM"
            $('.datetimepicker-container .body.timepicker .toggle-am-pm').text("PM")
        } else {
            finaltimePeriod = "AM"
            $('.datetimepicker-container .body.timepicker .toggle-am-pm').text("AM")
        }

        // display calendar
        displayTimePicker()

        //show footer
        $('.datetimepicker-container .footer').show()
    })

    $(document)[0].addEventListener('click', function (e) {
        if ($('.ui-datetime-picker-wrapper').find($(e.target)).length == 0) {
            // set value of input field with selected date
            if (!(finalDate.date == -1)) {
                formatted_date = formatDate(finalDate)
                $('.ui-datetime-picker-wrapper .ui-datetime-picker-input').val(formatted_date)
            }
            $('div.datetimepicker-container').remove()
        }
    }, true)

    $(document).on('click', '.datetimepicker-container .body.datepicker table td:not(.disabled)', function () {
        // save selected date
        let date = $(this).text()
        $('.datetimepicker-container .body.datepicker table td').removeClass('selected')
        $(this).addClass('selected')
        finalDate.date = date
        let min_date = new Date(datetimepicker_options['min_date'])
        let max_date = new Date(datetimepicker_options['max_date'])

        if (datetimepicker_options["min_date"] != -1 && datetimepicker_options["max_date"] == -1) {
            //only min date is present
            if (viewingDate.year >= min_date.getFullYear()) {
                finalDate.year = viewingDate.year
            }
            if (viewingDate.month >= min_date.getMonth()) {
                finalDate.month = viewingDate.month
            }
        } else if (datetimepicker_options["max_date"] != -1 && datetimepicker_options["min_date"] == -1) {
            //only max date is present
            if (viewingDate.year <= max_date.getFullYear()) {
                finalDate.year = viewingDate.year
            }
            if (viewingDate.month <= max_date.getMonth()) {
                finalDate.month = viewingDate.month
            }
        } else if (datetimepicker_options["max_date"] != -1 && datetimepicker_options["min_date"] != -1) {
            //both min date and max date are present
            if (viewingDate.year >= min_date.getFullYear() && viewingDate.year <= max_date.getFullYear()) {
                finalDate.year = viewingDate.year
            }
            if (viewingDate.month >= min_date.getMonth() && viewingDate.month <= max_date.getMonth()) {
                finalDate.month = viewingDate.month
            }
        }
    })
})

function initDateTimePicker(datetimepickerInputElement) {
    // initially display datetimepicker with current month, year
    let html = `<div class="datetimepicker-container">
                    <div class="header">
                    </div>
                    <div class="body">
                    </div>
                    <div class="footer">
                        <div class="toggle time">
                            <i class="far fa-clock"></i>
                        </div>
                    </div>
                </div>`

    $(datetimepickerInputElement).after(html)
    displayCalendar(finalDate.month, finalDate.year)
}

function displayCalendar(month, year) {
    let startingDayOfMonth = new Date(year, month, 1).getDay()
    let totalDaysInMonth = new Date(year, parseInt(month) + 1, 0).getDate()

    let min_date = -1
    let max_date = totalDaysInMonth + 1
    let disable_year = false
    let disable_month = false

    if (datetimepicker_options["min_date"] != -1) {
        let min_full_date = new Date(datetimepicker_options["min_date"])
        if (year < min_full_date.getFullYear()) {
            min_date = totalDaysInMonth + 1
        } else if (min_full_date.getFullYear() == year && month < min_full_date.getMonth()) {
            min_date = totalDaysInMonth + 1
        } else if (min_full_date.getMonth() == month && min_full_date.getFullYear() == year) {
            min_date = min_full_date.getDate()
        }
    }

    if (datetimepicker_options["max_date"] != -1) {
        let max_full_date = new Date(datetimepicker_options["max_date"])
        if (year > max_full_date.getFullYear()) {
            // since the whole year is disabled and so are all the months
            disable_year = true
            disable_month = true
            max_date = 0
        } else if (max_full_date.getFullYear() == year && month > max_full_date.getMonth()) {
            //since the whole month is disbaled, set the flag to true
            disable_month = true
            max_date = 0
        } else if (max_full_date.getMonth() == month && max_full_date.getFullYear() == year) {
            max_date = max_full_date.getDate()
        }
    }
    fillHeaderCalendar(month, year, disable_month, disable_year)
    fillBodyCalendar(month, year, startingDayOfMonth, totalDaysInMonth, min_date, max_date)
}

function fillHeaderCalendar(month, year, disable_month, disable_year) {
    let html = `<div class="calendar">
                    <span class="month">
                        <span class="previous-month">
                            <i class="fa fa-chevron-left"></i>
                        </span>
                        <span class="select-month ${disable_month ? "disabled" : ""}">
                            <span class="${month}">${MONTHS[month]}</span>
                        </span>
                        <span class="next-month">
                            <i class="fa fa-chevron-right"></i>
                        </span>
                    </span>
                    <span class="year">
                        <span class="previous-year">
                            <i class="fa fa-chevron-left"></i>
                        </span>
                        <span class="select-year ${disable_year ? "disabled" : ""}">${year}</span>
                        <span class="next-year">
                            <i class="fa fa-chevron-right"></i>
                        </span>
                    </span>
                </div>`
    $('.datetimepicker-container .header').attr('class', 'header datepicker')
    $('.datetimepicker-container .header.datepicker').html(html)
}

function fillBodyCalendar(month, year, day, total_days, min_date, max_date) {
    let i = 1;
    let html = `<table>
                    <thead>
                        <tr>`
    $.each(DAYS, function (index, value) {
        html += `<th> ${value} </th>`
    })
    html += `   </tr>
            </thead>
            <tbody>
                <tr>`
    $.each(DAYS, function (index, value) {
        if (index >= day) {
            if (parseInt(finalDate.date) == i && parseInt(finalDate.month) == month && parseInt(finalDate.year == year)) {
                if (i < min_date || i > max_date) {
                    html += `<td class="disabled">${i}</td>`
                } else {
                    html += `<td class="selected">${i}</td>`
                }

            } else {
                if (i < min_date || i > max_date) {
                    html += `<td class="disabled">${i}</td>`
                } else {
                    html += `<td>${i}</td>`
                }
            }
            i++;
        }
        else {
            html += `<td></td>`
        }
    })
    html += `</tr><tr>`
    for (x = 0; i <= total_days; x++) {
        if ((x % 7 == 0) && (x != 0)) {
            html += `</tr><tr>`
        }
        if (parseInt(finalDate.date) == i && parseInt(finalDate.month) == month && parseInt(finalDate.year) == year) {
            if (i < min_date || i > max_date) {
                html += `<td class="disabled">${i}</td>`
            } else {
                html += `<td class="selected">${i}</td>`
            }

        } else {
            if (i < min_date || i > max_date) {
                html += `<td class="disabled">${i}</td>`
            } else {
                html += `<td>${i}</td>`
            }
        }
        i++
    }
    html += `</tr></tbody></table>`
    $('.datetimepicker-container .body').attr('class', 'body datepicker')
    $('.datetimepicker-container .body.datepicker').html(html)
}

function displayMonthPicker() {
    fillHeaderMonthPicker()
    fillBodyMonthPicker()
}

function fillHeaderMonthPicker() {
    $('.datetimepicker-container .header').attr('class', 'header monthpicker')
    $('.datetimepicker-container .header.monthpicker').html(`<span> Select Month</span>`)
}

function fillBodyMonthPicker() {
    $('.datetimepicker-container .body').attr('class', 'body monthpicker')
    let html = `<div class="month-container">`
    $.map(MONTHS, function (value, index) {
        html += `<div class="${index}">${value}</div>`
    })
    html += `</div> `
    $('.datetimepicker-container .body.monthpicker').html(html);
}

function displayYearPicker() {
    let start_year = parseInt(finalDate.year) - 5
    let end_year = parseInt(finalDate.year) + 6
    fillHeaderYearPicker(start_year, end_year)
    fillBodyYearPicker(start_year, end_year)
}

function displayNextDozenYears() {
    let current_end_year = $('.datetimepicker-container .header.yearpicker .current-dozen .end-year').text()
    let next_start_year = parseInt(current_end_year) + 1
    let next_end_year = parseInt(current_end_year) + 12
    fillHeaderYearPicker(next_start_year, next_end_year)
    fillBodyYearPicker(next_start_year, next_end_year)
}

function displayPreviousDozenYears() {
    let current_start_year = $('.datetimepicker-container .header.yearpicker .current-dozen .start-year').text()
    let previous_start_year = parseInt(current_start_year) - 12
    let previous_end_year = parseInt(current_start_year) - 1
    fillHeaderYearPicker(previous_start_year, previous_end_year)
    fillBodyYearPicker(previous_start_year, previous_end_year)
}

function fillHeaderYearPicker(start_year, end_year) {
    $('.datetimepicker-container .header').attr('class', 'header yearpicker')
    let html = `<span class="previous-dozen-years">
                    <i class="fa fa-chevron-left"></i>
                </span >
                <span class="current-dozen">
                    <span class="start-year">${start_year}</span> - <span class="end-year">${end_year}</span>
                </span>
                <span class="next-dozen-years">
                    <i class="fa fa-chevron-right"></i>
                </span>`
    $('.datetimepicker-container .header.yearpicker').html(html)
}

function fillBodyYearPicker(start_year, end_year) {
    $('.datetimepicker-container .body').attr('class', 'body yearpicker')
    let html = `<div class="year-container"> `

    for (i = start_year; i <= end_year; i++) {

        if (i == finalDate.year) {
            html += `<div class="current-year ${i}"> ${i}</div>`
        } else {
            html += `<div class="${i}" > ${i}</div>`
        }
    }
    html += `</div>`
    $('.datetimepicker-container .body.yearpicker').html(html);
}

function toggleDateTimePickers() {
    if ($('.datetimepicker-container .footer .toggle').hasClass("time")) {
        //display timepicker
        displayTimePicker()

        //toggle footer icon
        toggleFooterIcon()

    } else {
        //display datepicker
        displayCalendar(finalDate.month, finalDate.year)

        //toggle footer icon
        toggleFooterIcon()
    }
}

function toggleFooterIcon() {
    $('.datetimepicker-container .footer .toggle').children().toggleClass("fa-calendar-alt fa-clock")
    $('.datetimepicker-container .footer .toggle').toggleClass("time date")
}

function displayTimePicker() {
    fillHeaderTimePicker()
    fillBodyTimePicker()
}

function fillHeaderTimePicker() {
    $('.datetimepicker-container .header').attr('class', 'header timepicker')
    $('.datetimepicker-container .header.timepicker').html(`<span> Select Time</span> `)
}

function fillBodyTimePicker() {
    let html = `<div class="time-container">
        <div class="hour-container">
            <div class="next-hour"><i class="fa fa-chevron-up"></i></div>
            <div class="hour">${finaltimeHour}</div>
            <div class="previous-hour"><i class="fa fa-chevron-down"></i></div>
        </div>
        <div class="separator-container">
            <span>:</span>
        </div>
        <div class="minute-container">
            <div class="next-minute"><i class="fa fa-chevron-up"></i></div>
            <div class="minute">${finaltimeMinute}</div>
            <div class="previous-minute"><i class="fa fa-chevron-down"></i></div>
        </div>
        <div class="toggle-am-pm">
            ${finaltimePeriod}
        </div
                </div> `
    $('.datetimepicker-container .body').attr('class', 'body timepicker')
    $('.datetimepicker-container .body.timepicker').html(html);
}

function displayHourPicker() {
    fillHeaderHourPicker()
    fillBodyHourPicker()
}

function fillHeaderHourPicker() {
    $('.datetimepicker-container .header').attr('class', 'header hourpicker')
    $('.datetimepicker-container .header.hourpicker').html(`<span> Select Hour</span>`)
}

function fillBodyHourPicker() {
    $('.datetimepicker-container .body').attr('class', 'body hourpicker')
    let html = `<div class="hour-container">`
    for (i = 1; i <= 12; i++) {
        html += `<div> ${i}</div>`
    }
    html += `</div>`
    $('.datetimepicker-container .body.hourpicker').html(html);
}

function displayMinutePicker() {
    fillHeaderMinutePicker()
    fillBodyMinutePicker()
}

function fillHeaderMinutePicker() {
    $('.datetimepicker-container .header').attr('class', 'header minutepicker')
    $('.datetimepicker-container .header.hourpicker').html(`<span> Select Minute</span> `)
}

function fillBodyMinutePicker() {
    $('.datetimepicker-container .body').attr('class', 'body minutepicker')
    let html = `<div class="minute-container"> `
    for (i = 0; i <= 59; i += 5) {
        html += `<div> ${i}</div> `
    }
    html += `</div>`
    $('.datetimepicker-container .body.minutepicker').html(html);
}

function formatDate(dateObject) {
    let format = datetimepicker_options['format']
    let token_regex = /%([d]{1,2}|[m]{1,2}|[y]{2,4}|[H]{1,2}|[h]{1,2}|[M]{1,2}|[S]{1,2}|[A,B,P,a,b,p])/gm
    let new_date = format.replace(token_regex, function (a, b) {
        switch (a) {
            case '%d':
                return dateObject.date
            case '%dd':
                if (dateObject.date < 10)
                    return "0" + dateObject.date
                else
                    return dateObject.date
            case '%m':
                return dateObject.month
            case '%mm':
                if (dateObject.month < 10)
                    return "0" + (dateObject.month + 1)
                else
                    return (dateObject.month + 1)
            case '%yy':
                return (dateObject.year % 100)
            case '%yyyy':
                return dateObject.year
            case '%h':
                return finaltimeHour
            case '%hh':
                if (finaltimeHour < 10)
                    return "0" + finaltimeHour
                else
                    return finaltimeHour
            case '%H':
                return finaltimeHour
            case '%HH':
                return finaltimeHour
            case '%M':
                return finaltimeMinute
            case '%MM':
                if (finaltimeMinute < 10)
                    return "0" + finaltimeMinute
                else
                    return finaltimeMinute
            case '%S':
                return date.getSeconds()
            case '%SS':
                if (date.getSeconds() < 10)
                    return "0" + date.getSeconds()
                else
                    return date.getSeconds()
            case '%P':
                return finaltimePeriod
                break
            case '%p':
                return finaltimePeriod.toLowerCase()
                break
            case '%a':
                return DAYS[date.getDay()]
                break
            case '%A':
                return FULL_DAYS[date.getDay()]
                break
            case '%b':
                return MONTHS[dateObject.month]
                break
            case '%B':
                return FULL_MONTHS[dateObject.month]
                break
        }
    })
    return new_date

}