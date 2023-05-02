let button = document.querySelector('.button');

button.addEventListener('click', () => {
  let current_date = new Date();
  let current_day = current_date.getDay();
  let current_year = current_date.getFullYear();
  let current_month = current_date.getMonth() + 1;

  let testDate_day = document.getElementById('input-box-day').value
    ? parseInt(document.getElementById('input-box-day').value)
    : undefined;
  let testDate_year = document.getElementById('input-box-year').value
    ? parseInt(document.getElementById('input-box-year').value)
    : undefined;
  let testDate_month = document.getElementById('input-box-month').value
    ? parseInt(document.getElementById('input-box-month').value)
    : undefined;

  // TESTING PER REQUEST OF DIANE IF WE CAN GET THE DAY OF THE WEEK
  // let newDate = new Date(`${testDate_year}-${testDate_month}-${testDate_day}`);
  // console.log(newDate);
  // END OF TESTING

  let isLeapYear = leapYear(testDate_year);
  // console.log(isLeapYear);
  let month_days = getMonthDays(testDate_month);

  // variables for user input validation
  let isDayValid = validateDate(testDate_day);
  let isMonthValid = validateMonth(month_days);
  let isYearValid = validateYear(testDate_year);

  let valid;
  let output;

  // variables for span targetting
  let span_years = document.getElementById('years');
  let span_months = document.getElementById('months');
  let span_days = document.getElementById('days');
  let span_error_days = document.getElementById('error-output-day');
  let span_error_months = document.getElementById('error-output-month');
  let span_error_years = document.getElementById('error-output-year');

  function leapYear(year) {
    if (year % 4 == 0) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      // console.log('testing');
      return false;
    }
  }

  function getMonthDays(month) {
    if (month === 1) {
      return 31;
    } else if (month === 2) {
      if (isLeapYear == true) {
        return 29;
      } else {
        return 28;
      }
    } else if (month === 3) {
      return 31;
    } else if (month === 4) {
      return 30;
    } else if (month === 5) {
      return 31;
    } else if (month === 6) {
      return 30;
    } else if (month === 7) {
      return 31;
    } else if (month === 8) {
      return 31;
    } else if (month === 9) {
      return 30;
    } else if (month === 10) {
      return 31;
    } else if (month === 11) {
      return 30;
    } else if (month === 12) {
      return 31;
    }
  }

  function calculate(
    current_date,
    current_month,
    current_year,
    birth_date,
    birth_month,
    birth_year
  ) {
    //   Add one month and set birth_date to zero whenever the birthday is at the end of the month (added when I encountered a birthday of February 28, 2023 gave an age of 3 days + 2 months + 0 years from a current date of May 1, 2023)
    if (birth_date == getMonthDays(birth_month)) {
      birth_date = 0;
      if (birth_month == 12) {
        birth_month = 1;
        birth_year = birth_year + 1;
      } else {
        birth_month = birth_month + 1;
      }
    }

    //   If current_date is less than birth_date, subtract one month then add the number of days of the previous month to the current_date. Condition where current_month is January is also taken into consideration.
    if (current_date < birth_date) {
      if (current_month === 1) {
        current_month = 12;
        current_year = current_year - 1;
        current_date = current_date + getMonthDays(current_month);
      } else {
        current_month = current_month - 1;
        current_date = current_date + getMonthDays(current_month);
      }
    }

    // If current_month is less than birth_month, add 12 months to current_month then subtract 1 year to current_year
    if (current_month < birth_month) {
      current_month = current_month + 12;
      current_year = current_year - 1;
    }

    // The function returns an object with the data on the number of the age in terms of days, months, years from user inputted birthday to current date
    return {
      days: current_date - birth_date,
      months: current_month - birth_month,
      years: current_year - birth_year,
    };
  }

  function isValid(isMonthValid, isDayValid, isYearValid) {
    if (isMonthValid == true && isDayValid == true && isYearValid == true) {
      return true;
    } else {
      return false;
    }
  }
  // console.log(isDayValid, isMonthValid, isYearValid);

  function validateDate(date) {
    if (date == undefined) {
      return false;
    } else if (date < 1 || date > month_days || date > 31) {
      return false;
    } else if (
      current_month == testDate_month &&
      current_year == testDate_year
    ) {
      if (current_day < testDate_day) {
        // console.log('Future date within the month is not allowed');
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  function validateYear(year) {
    if (year == undefined) {
      return false;
    } else if (year < 1 || year > current_year) {
      return false;
    } else {
      return true;
    }
  }

  function validateMonth(month_days) {
    if (month_days == undefined) {
      return false;
    } else if (testDate_month < 1 || testDate_month > 12) {
      return false;
    } else if (current_year == testDate_year) {
      if (current_month < testDate_month) {
        // console.log('Future month within the year is not allowed');
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  valid = isValid(isMonthValid, isDayValid, isYearValid);
  if (valid == true) {
    output = calculate(
      current_day,
      current_month,
      current_year,
      testDate_day,
      testDate_month,
      testDate_year
    );
    span_years.innerText = span_years.textContent = `${output.years}`;
    span_months.innerText = span_months.textContent = `${output.months}`;
    span_days.innerText = span_days.textContent = `${output.days}`;
    span_error_months.innerText = span_error_months.textContent = '';
    span_error_days.innerText = span_error_days.textContent = '';
    span_error_years.innerText = span_error_years.textContent = '';
  }

  if (isMonthValid == false) {
    span_years.innerText = span_years.textContent = '- -';
    span_months.innerText = span_months.textContent = '- -';
    span_days.innerText = span_days.textContent = '- -';
    span_error_months.innerText = span_error_months.textContent =
      'Invalid month input';
  } else {
    span_error_months.innerText = span_error_months.textContent = '';
  }

  if (isDayValid == false) {
    // console.log('Invalid day input');
    span_years.innerText = span_years.textContent = '- -';
    span_months.innerText = span_months.textContent = '- -';
    span_days.innerText = span_days.textContent = '- -';
    span_error_days.innerText = span_error_days.textContent =
      'Invalid day input';
  } else {
    span_error_days.innerText = span_error_days.textContent = '';
  }

  if (isYearValid == false) {
    // console.log('Invalid year input');
    span_years.innerText = span_years.textContent = '- -';
    span_months.innerText = span_months.textContent = '- -';
    span_days.innerText = span_days.textContent = '- -';
    span_error_years.innerText = span_error_years.textContent =
      'Invalid year input';
  } else {
    span_error_years.innerText = span_error_years.textContent = '';
  }
});
