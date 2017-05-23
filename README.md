Date Types
==========

Date Types provides separate, immutable date and time types for Javascript. Theese types are designed to be used with the date-fns library. They're thin wrappers for the built-in Date type, and retain applicable methods. They introduce new, simpler properties to access components, and use UTC wherever possible.

Motivation
----------
Javascript's two leading libraries for dates and times, the built-in Date, and MomentJS, only provide combined dates and times. Dates are represented in these libraries by creating a datetime with 0 for all time components; times are represented by creating a datetime with 0 for all date components. This feels imprecise, and prone to errors; there are many cases where you might represent a pure date: Asking for its hours property shouldn't return 0; the query doens't make sense. Nor does adding 5 minutes to it.

Types
-----
DateOnly: Wrapper for builtin Date, with all setters, and methods relating to time removed
New properties:
 - year: year component
 - month: month component
 - day: day of the month component

Time: Wrapper for builtin Date, with all setters, and methods relating to date removed
New properties - all use UTC only.
 - hour: hour component
 - minute: minute component
 - second: second component
 - millisecond: millisecond component

DateTime: Wrapper for builtin Date, with all setters removed
New properties - properties from both DateOnly and Time combined.

Functions
---------


Setup
-----
    npm install date-types
    // or
    yarn add date-types

    import { DateOnly, Time, DateTime } from 'date-types'
    import * as dt from 'date-types'


Examples
--------

    // March 3, 2016; retains the built-in Date's use of 0-based Month indexing.
    const date = new DateOnly(2016, 2, 3)

    date.year // 2016
    date.getFullYear() // 2016

    date.hour  // undefined
    date.getHours() // Uncaught TypeError: date.getHours is not a function

    dateFns.addDays(date, 5) // ERROR?

    // 11:30 am UTC; no seconds
    const time = new Time(11, 30)

    time.setSeconds(30)  // Uncaught TypeError: time.setSeconds is not a function
    time.hour = 4  // ERROR; Time (and DateOnly/DateTime) are immutable.

    dt.today() // A DateOnly object of the current day

    dt.combine(date, time) // March 3, 2016, 11:30 am UTC


https://github.com/David-OConnor/date-types