const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

/* 
    Initialising variables that store the final date that the user picks
    Note:
        finaldateDate is initialised to -1 so that if the user doesn't pick any date, the input field is left blank
*/

let date = new Date()
let finaldateMonth = date.getMonth();
let finaldateYear = date.getFullYear();
let finaldateDate = -1;
let time = date.toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ')
let finaltimeHour = time[0]
let finaltimeMinute = date.getMinutes();
let finaltimePeriod = time[1]

$(function () {

    // give default values to the global variables depending on the value of the input field
    if ($('.ui-datetime-picker-wrapper > .ui-datetime-picker-input').val() != "") {
        let val = $('.ui-datetime-picker-wrapper > .ui-datetime-picker-input').val()

        // for firefox browser
        val = val.replace(' UTC', '')

        let date = new Date(val)
        finaldateMonth = date.getMonth();
        finaldateYear = date.getFullYear();
        finaldateDate = date.getDate();
        let time = date.toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ')
        finaltimeHour = time[0];
        finaltimeMinute = date.getMinutes();
        finaltimePeriod = time[1]

        date = finaldateDate + " " + MONTHS[finaldateMonth] + " " + finaldateYear + " " + finaltimeHour + ":" + finaltimeMinute + " " + finaltimePeriod
        $('.ui-datetime-picker-wrapper .ui-datetime-picker-input').val(new Date(date).toLocaleString('en-US', { hour12: true }))

    }

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
        //save the selected month value
        finaldateMonth = $(this)[0].className

        // display calendar
        displayCalendar(finaldateMonth, finaldateYear)

        //show footer
        $('.datetimepicker-container .footer').show()
    })

    $(document).on('click', '.datetimepicker-container .header.datepicker .previous-month', function () {
        let selected_month = $('.datetimepicker-container .header.datepicker .select-month span')[0].className
        // get the previous value of current month and save it
        if (selected_month == 0) {
            finaldateMonth = 11
            finaldateYear = finaldateYear - 1
        }
        else {
            finaldateMonth = selected_month - 1
        }

        // display calendar
        displayCalendar(finaldateMonth, finaldateYear)
    })

    $(document).on('click', '.datetimepicker-container .header.datepicker .next-month', function () {
        let selected_month = $('.datetimepicker-container .header.datepicker .select-month span')[0].className
        // get the next value of current month and save it
        if (selected_month == 11) {
            finaldateMonth = 0
            finaldateYear = finaldateYear + 1
        } else {
            finaldateMonth = parseInt(selected_month) + 1
        }

        // display calendar
        displayCalendar(finaldateMonth, finaldateYear)
    })

    $(document).on('click', '.datetimepicker-container .header.datepicker .next-year', function () {
        let year = $('.datetimepicker-container .header.datepicker .select-year').text()
        finaldateYear = parseInt(year) + 1

        // display calendar
        displayCalendar(finaldateMonth, finaldateYear)
    })

    $(document).on('click', '.datetimepicker-container .header.datepicker .previous-year', function () {
        let year = $('.datetimepicker-container .header.datepicker .select-year').text()
        finaldateYear = parseInt(year) - 1

        // display calendar
        displayCalendar(finaldateMonth, finaldateYear)
    })

    $(document).on('click', '.datetimepicker-container .header.datepicker .select-year', function () {
        // display year picker
        displayYearPicker()

        //hide footer
        $('.datetimepicker-container .footer').hide()
    })

    $(document).on('click', '.datetimepicker-container .body.yearpicker .year-container div', function () {
        //save selected year
        finaldateYear = $(this).text()

        //display calendar
        displayCalendar(finaldateMonth, finaldateYear)

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
            if (!(finaldateDate == -1)) {
                date = finaldateDate + " " + MONTHS[finaldateMonth] + " " + finaldateYear + " " + finaltimeHour + ":" + finaltimeMinute + " " + finaltimePeriod
                $('.ui-datetime-picker-wrapper .ui-datetime-picker-input').val(new Date(date).toLocaleString('en-US', { hour12: true }))
            }
            $('div.datetimepicker-container').remove()
        }
    }, true)

    $(document).on('click', '.datetimepicker-container .body.datepicker table td', function () {
        // save selected date
        let date = $(this).text()
        $('.datetimepicker-container .body.datepicker table td').removeClass('selected')
        $(this).addClass('selected')
        finaldateDate = date
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
    displayCalendar(finaldateMonth, finaldateYear)
}

function displayCalendar(month, year) {
    let startingDayOfMonth = new Date(year, month, 1).getDay()
    let totalDaysInMonth = new Date(year, parseInt(month) + 1, 0).getDate()
    fillHeaderCalendar(month, year)
    fillBodyCalendar(startingDayOfMonth, totalDaysInMonth)
}

function fillHeaderCalendar(month, year) {
    let html = `<div class="calendar">
                    <span class="month">
                        <span class="previous-month">
                            <i class="fa fa-chevron-left"></i>
                        </span>
                        <span class="select-month">
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
                        <span class="select-year">${year}</span>
                        <span class="next-year">
                            <i class="fa fa-chevron-right"></i>
                        </span>
                    </span>
                </div>`
    $('.datetimepicker-container .header').attr('class', 'header datepicker')
    $('.datetimepicker-container .header.datepicker').html(html)
}

function fillBodyCalendar(day, total_days) {
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
            if (parseInt(finaldateDate) == i) {
                html += `<td class="selected">${i}</td>`

            } else {
                html += `<td>${i}</td>`
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
        if (parseInt(finaldateDate) == i) {
            html += `<td class="selected">${i}</td>`

        } else {
            html += `<td>${i}</td>`
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
    let start_year = parseInt(finaldateYear) - 5
    let end_year = parseInt(finaldateYear) + 6
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

        if (i == finaldateYear) {
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
        displayCalendar(finaldateMonth, finaldateYear)

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