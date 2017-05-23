// todo avoid getter/setter syntax.


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

    // Conversion methods
    toString() { return this.wrapped.toTimeString() }
      
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


export function today() {
    // Return the current date.
    return split(new Date())[0]
}


import * as dateFns from 'date-fns'

// let dt = new DateOnly(1999, 9, 9)

let dt = new DateTime(1999, 9, 9, 0, 0, 0, 0)
console.log(dt.year)

let date = new DateOnly(2001, 4, 22)
console.log(date.getDate())


let time = new Time(11, 30)
console.log(time.getHours())
console.log(time.hour)

console.log(date.toString())
console.log(time.toString())

console.log(combine(date, time))
console.log(combine(date, time).toString())
// let dt = new DateTime()
// console.log(dt.getHours(), "YEAH")


console.log(date.hour)

console.log(dateFns.addMilliseconds(date, 5))

console.log(typeof(dateFns.parse(date)))