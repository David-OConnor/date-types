Date Types
==========

Date Types provides separate, immutable date and time types for Javascript. They're thin wrappers for the built-in Date type, and retain applicable methods. They introduce new, simpler properties to access components, and use UTC wherever possible. Date Types provides functions that work on these types, focusing on using a clean syntax. All types provided by this module are immutable; applicable functions and methods return new instances.

Motivation
----------
Javascript's two leading libraries for dates and times, the built-in Date, and MomentJS, only provide combined dates and times. Dates are represented in these libraries by creating a datetime with 0 for all time components; times are represented by creating a datetime with 0 for all date components. This feels imprecise, and prone to errors; there are many cases where you might represent a pure date: Asking for its hours property shouldn't return 0; the query doens't make sense. Nor does adding 5 minutes to it. Initially, this project was planned to work along-side the popular DateFns library, but we're unable to make our new types pass its validation at this point. DateFns is included as a dependency, and is used internally in a few places.

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

TimeDelta: Stores the difference between two dates or times. Can be added to or subtracted from them using functions provided by this module.

Functions
---------


Setup
-----
    npm install date-types
    // or
    yarn add date-types

    import { DateOnly, Time, DateTime, TimeDelta } from 'date-types'
    import * as dt from 'date-types'


Examples
--------
Creating dates and times

    // March 3, 2016; retains the built-in Date's use of 0-based Month indexing.
    const date = new DateOnly(2016, 2, 3)

    // 11:30 am UTC; no seconds
    const time = new Time(11, 30)

    // March 3, 2016, 11:30 am UTC; a combination of the above date and time.
    const datetime = dt.combine(date, time)

    // Or:
    const datetime = new DateTime(2016, 2, 3, 11, 30)

    const today = dt.today() // A DateOnly object of the current day

Create a time delta: A difference between two times or dates

    const delta = new TimeDelta(1, 1000)  / One day, one second

Applicable methods from the built-in Date type are included:

    date.year // 2016
    date.getFullYear() // 2016

Methods that mutate the date/time, or use inapplicable methods are not

    time.setSeconds(30)  // Uncaught TypeError: time.setSeconds is not a function
    time.hour = 4  // ERROR; Time (and DateOnly/DateTime) are immutable.
    date.hour  // undefined
    date.getHours() // Uncaught TypeError: date.getHours is not a function

Add or subtract amounts of time

    dt.add(date, 5, "days") // March 8, 2016
    dt.add(time, -5, "hours")  // 06:35

Adding amounts to the type that are innapropriate raises exceptions

    dt.add(date, 5, "hours") // Exception: "Can't add hours to a date."
    dt.add(time, 2, "days") // Exception: "Can't add days to a time."

Create a time delta by taking the difference between two date/time objects.

    const delta = dt.difference(date, new DateOnly(2016, 2, 1)

Add or subtract a delta from a date/time

    dt.addDelta(date, delta)
    dt.subDelta(date, delta)

You can't subtract a delta that includes a time component from a DateOnly, and vice versa:

    dt.addDelta(time, delta)  // Exception: "Can't add a delta that includes date components to a time."


Convert a date or time to a string

    dt.format(datetime, 'YYYY-MM-DD HH:mm')  // '2016-03-03 11:30'

But only if the string token makes sense for the type you're using

    dt.format(date, 'YYYY-MM-DD HH:mm') // 'String format tokens that only apply to times are not allowed on dateOnlys.'


https://github.com/David-OConnor/date-types