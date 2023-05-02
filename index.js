let current_date = new Date();
let current_day = current_date.getDay();
let current_year = current_date.getFullYear();
let current_month = current_date.getMonth() + 1;

let testDate_day = 10;
let testDate_year = 1990;
let testDate_month = 12;
console.log(testDate_day, testDate_year, testDate_month);

let isLeapYear = leapYear(current_year);
let month_days = getMonthDays(testDate_month);

// variables for user input validation
let isDayValid = validateDate(testDate_day);
let isMonthValid = validateMonth(month_days);
let isYearValid = validateYear(testDate_year);

let valid;
let output;

function leapYear(year) {
  if (year % 100 === 0) {
    if (year % 400 === 0) {
      return true;
    } else {
      return false;
    }
  } else if (year % 4 === 0) {
    return true;
  } else {
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
  } else {
    return undefined;
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

function validateDate(date) {
  if (date < 1 || date > month_days) {
    return false;
  } else if (current_month == testDate_month && current_year == testDate_year) {
    if (current_day < testDate_day) {
      console.log('Future date within the month is not allowed');
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

function validateYear(year) {
  if (year < 1 || year > current_year) {
    return false;
  } else return true;
}

function validateMonth(month_days) {
  if (month_days == undefined) {
    console.log('if one');
    return false;
  } else if (current_year == testDate_year) {
    if (current_month < testDate_month) {
      console.log('Future month within the year is not allowed');
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
  console.log(output);
}
if (isMonthValid == false) {
  console.log('Invalid month input');
}
if (isDayValid == false) {
  console.log('Invalid day input');
}
if (isYearValid == false) {
  console.log('Invalid year input');
}
