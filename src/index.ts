import * as dateFns from 'date-fns'

export class DateTime {
    // We don't extend Date; extending built-in classes is awkward and controversial in JS.
    // There's no multiple inherritance in ES6, so DRY between these classes.
    readonly year: number
    readonly month: number
    readonly day: number
    readonly hour: number
    readonly minute: number
    readonly second: number
    readonly millisecond: number
    protected wrapped: Date

    constructor(year: number, month: number, day: number, hour: number=0, minute: number=0,
        second: number=0, millisecond: number=0) {
       
         this.wrapped = new Date(year, month, day, hour, minute, second, millisecond)

         this.year = year
         this.month = month
         this.day = day
         this.hour = hour
         this.minute = minute
         this.second = second
         this.millisecond = millisecond

      }

      // Allow access to built-in methods for compatibility
    getDate() {return this.wrapped.getDate()}
    getDay() {return this.wrapped.getDay()}
    getFullYear() {return this.wrapped.getFullYear()}
    getHours() {return this.wrapped.getHours()}
    getMilliseconds() {return this.wrapped.getMilliseconds()}
    getMinutes() {return this.wrapped.getMinutes()}
    getMonth() {return this.wrapped.getMonth()}
    getSeconds() {return this.wrapped.getSeconds()}
    getTime() {return this.wrapped.getTime()}
    getTimezoneOffset() {return this.wrapped.getTimezoneOffset()}
    getUTCDate() {return this.wrapped.getUTCDate()}
    getUTCDay() {return this.wrapped.getUTCDay()}
    getUTCFullYear() {return this.wrapped.getUTCFullYear()}
    getUTCHours() {return this.wrapped.getUTCHours()}
    getUTCMilliseconds() {return this.wrapped.getUTCMilliseconds()}
    getUTCMinutes() {return this.wrapped.getUTCMinutes()}
    getUTCMonth() {return this.wrapped.getUTCMonth()}
    getUTCSeconds() {return this.wrapped.getUTCSeconds()}
  

    toString() { return this.wrapped.toString() }
}


export class Time {
    readonly hour: number
    readonly minute: number
    readonly second: number
    readonly millisecond: number
    protected wrapped: Date

    constructor(hour: number=0, minute: number=0,
        second: number=0, millisecond: number=0) {
       
         this.wrapped = new Date(0, 0, 0, hour, minute, second, millisecond)

         this.hour = hour
         this.minute = minute
         this.second = second
         this.millisecond = millisecond

      }

    // Allow access to built-in methods for compatibility
    getHours() {return this.wrapped.getHours()}
    getMilliseconds() {return this.wrapped.getMilliseconds()}
    getMinutes() {return this.wrapped.getMinutes()}
    getSeconds() {return this.wrapped.getSeconds()}
    getTime() {return this.wrapped.getTime()}
    getTimezoneOffset() {return this.wrapped.getTimezoneOffset()}
    getUTCHours() {return this.wrapped.getUTCHours()}
    getUTCMilliseconds() {return this.wrapped.getUTCMilliseconds()}
    getUTCMinutes() {return this.wrapped.getUTCMinutes()}
    getUTCSeconds() {return this.wrapped.getUTCSeconds()}


    getDate() {return this.wrapped.getDate()}
    getDay() {return this.wrapped.getDay()}
    getFullYear() {return this.wrapped.getFullYear()}
    getMonth() {return this.wrapped.getMonth()}
    getUTCDate() {return this.wrapped.getUTCDate()}
    getUTCDay() {return this.wrapped.getUTCDay()}
    getUTCFullYear() {return this.wrapped.getUTCFullYear()}
    getUTCMonth() {return this.wrapped.getUTCMonth()}


    // Conversion methods
    // todo toTimeString is causing bugs with datefn validation.
    toString() { return this.wrapped.toString() }
      
    toISOString() {
        // todo timezone? 0-padding.
        return this.hour.toString() + ':' + this.minute.toString() + ':' + this.second.toString() + 
        '.' + this.millisecond.toString()
    }
}


export class DateOnly {
    readonly year: number
    readonly month: number
    readonly day: number
    protected wrapped: Date

    constructor(year: number, month: number, day: number) {
       
        this.wrapped = new Date(year, month, day)

        this.year = year
        this.month = month
        this.day = day
      }

    // Allow access to built-in methods for compatibility
    getDate() {return this.wrapped.getDate()}
    getDay() {return this.wrapped.getDay()}
    getFullYear() {return this.wrapped.getFullYear()}
    getMonth() {return this.wrapped.getMonth()}
    getUTCDate() {return this.wrapped.getUTCDate()}
    getUTCDay() {return this.wrapped.getUTCDay()}
    getUTCFullYear() {return this.wrapped.getUTCFullYear()}
    getUTCMonth() {return this.wrapped.getUTCMonth()}
  
    toString() { return this.wrapped.toDateString() }

    toISOString() {
    // todo 0-pad month and day.
    return this.year.toString() + '-' + (this.month + 1).toString() + '-' +
        this.day.toString()
    }
}


export class TimeDelta {
    readonly days: number
    readonly milliseconds: number

    constructor(days: number=0, hours: number=0, minutes: number=0,
                seconds: number=0, milliseconds: number=0) {
                    this.days = days
                    this.milliseconds = milliseconds + seconds * 1000 + minutes * 60 * 1000 + 
                    hours * 3600 * 1000
                }   
}


export function fromDate(date: Date, category: string) {
    // Convert a built-in date to a datetime, date, or time object.
    if (category == 'datetime') {
        return new DateTime(date.getUTCFullYear(), date.getUTCMonth(), date.getDay(),
            date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds())
    }
    if (category == 'date') {
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getDay())
    }
    if (category == 'time') {
        return new Time(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds())
    }
}


export function split(dt: DateTime | Date) {
    // Split a DateTime (JS Date) into components
    const date = new DateOnly(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate())
    const time = new Time(dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds(), dt.getUTCMilliseconds())

    return [date, time]
}


export function combine(date: DateOnly, time: Time) {
    // Combine a date and time into a datetime
    return new DateTime(date.year, date.month, date.day, time.hour, time.minute, time.second, time.millisecond)
}

export function format(dt: Date | DateTime | DateOnly | Time, formatStr: string) {
    const timeOnlyTokens= ['H', 'k', 'a', 'A', 'm', 's', 'S', 'Z']
    const dateOnlyTokens= ['Y', 'Q', 'M', 'D','Do', 'x', 'X', 'g', 'w', 'e', 'd', 'gg', 'GG', 'W', 'E']

    if (dt instanceof DateOnly) {
        for (let token of timeOnlyTokens) {
            if (formatStr.indexOf(token) >= 0) {
                throw 'String format tokens that only apply to times are not allowed on dateOnlys.'
            }
        }
    }
    else if (dt instanceof Time) {
        for (let token of dateOnlyTokens) {
            if (formatStr.indexOf(token) >= 0) {
                throw 'String format tokens that only apply to dates are not allowed on Times.'
            }
        }
    }
    if (dt instanceof Date) {
        return dateFns.format(dt, formatStr)
    }
    return dateFns.format((dt as any).wrapped, formatStr)
}


export function add(dt: Date | DateTime | DateOnly | Time, amount: number, category: string) {
    // Add (or subtract) a fixed amount of time from a Date/Datetime/dateOnly/Time object.
   
    if (dt instanceof Date) {
        switch (category) {
            case 'days':
                return dateFns.addDays(dt, amount)
            case 'months':
                return dateFns.addMonths(dt, amount)
            case 'years':
                return dateFns.addYears(dt, amount)
            case 'weeks':
                return dateFns.addWeeks(dt, amount)
            case 'hours':
                return dateFns.addHours(dt, amount)
            case 'minutes':
                return dateFns.addMinutes(dt, amount)
            case 'seconds':
                return dateFns.addSeconds(dt, amount)
            case 'milliseconds':
                return dateFns.addMilliseconds(dt, amount)
        }
    }
     let resultDate: Date

    if (dt instanceof DateTime) {
        switch (category) {
            case 'days':
                resultDate = dateFns.addDays((dt as any).wrapped, amount)
            case 'months':
                resultDate = dateFns.addMonths((dt as any).wrapped, amount)
            case 'years':
                resultDate = dateFns.addYears((dt as any).wrapped, amount)
            case 'weeks':
                resultDate = dateFns.addWeeks((dt as any).wrapped, amount)
            case 'hours':
                resultDate = dateFns.addHours((dt as any).wrapped, amount)
            case 'minutes':
                resultDate = dateFns.addMinutes((dt as any).wrapped, amount)
            case 'seconds':
                resultDate = dateFns.addSeconds((dt as any).wrapped, amount)
            case 'milliseconds':
                resultDate = dateFns.addMilliseconds((dt as any).wrapped, amount)
        }

        return fromDate(resultDate, 'datetime')
    }

    else if (dt instanceof Time) {
        switch (category) {
            case 'days':
                throw "Can't add days to a time."
            case 'months':
                throw "Can't add months to a time."
            case 'years':
                throw "Can't add years to a time."
            case 'weeks':
                throw "Can't add weeks to a time."
            case 'hours':
                resultDate = dateFns.addHours((dt as any).wrapped, amount)
            case 'minutes':
                resultDate = dateFns.addMinutes((dt as any).wrapped, amount)
            case 'seconds':
                resultDate = dateFns.addSeconds((dt as any).wrapped, amount)
            case 'milliseconds':
                resultDate = dateFns.addMilliseconds((dt as any).wrapped, amount)
        }

        return fromDate(resultDate, 'time')
    }

    else if (dt instanceof DateOnly) {
        switch (category) {
            case 'days':
                resultDate = dateFns.addDays((dt as any).wrapped, amount)
            case 'months':
                resultDate = dateFns.addMonths((dt as any).wrapped, amount)
            case 'years':
                resultDate = dateFns.addYears((dt as any).wrapped, amount)
            case 'weeks':
                resultDate = dateFns.addWeeks((dt as any).wrapped, amount)
            case 'hours':
                throw "Can't add hours to a date."
            case 'minutes':
                throw "Can't add minutes to a date."
            case 'seconds':
                throw "Can't add seconds to a date."
            case 'milliseconds':
                throw "Can't add milliseconds to a date."
        }

        return fromDate(resultDate, 'date')
    }
}


export function addDelta(dt: Date | DateTime | DateOnly | Time, delta: TimeDelta) {
    // Add a time delta to a date/time.
    if (dt instanceof DateOnly) {
        if (delta.milliseconds > 0) {
            throw "Can't add a delta that includes time components to a dateOnly."
        }
        return new DateOnly(dt.year, dt.month, dt.day + delta.days)
    }

    if (dt instanceof Time) {
        if (delta.days > 0) {
            throw "Can't add a delta that includes date components to a time."
        }
        return new Time(dt.hour, dt.minute, dt.second, dt.millisecond + delta.milliseconds)
    }

    else if (dt instanceof DateTime) {
        return new DateTime(dt.year, dt.month, dt.day + delta.days, dt.hour, dt.minute, 
            dt.second, dt.millisecond + delta.milliseconds)
    }

}

export function subDelta(dt: Date | DateTime | DateOnly | Time, delta: TimeDelta) {
    // Subtract a time delta from a date/time.
    const negativeDelta = new TimeDelta(-delta.days, 0, 0, 0, -delta.milliseconds)
    return addDelta(dt, negativeDelta)
}


export function today() {
    // Return the current date.
    return split(new Date())[0]
}




// let dt = new DateOnly(1999, 9, 9)

let dt = new DateTime(1999, 9, 9, 1, 0, 0, 0)
let time = new Time(11, 30)
let date = new DateOnly(2001, 4, 22)

console.log("HELLO")

