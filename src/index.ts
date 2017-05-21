// todo avoid getter/setter syntax.


class DateTime extends Date {
    constructor(year: number, month: number, day: number, hour: number, minute: number,
     second: number, millisecond: number) {
        super(Date)

        this.setFullYear(year)
        this.setMonth(month)
        this.setDate(day)
        this.setHours(hour)
        this.setMinutes(minute)
        this.setSeconds(second)
        this.setMilliseconds(millisecond)

    }

}


class Time extends Date {
    constructor(hour: number, minute: number, second: number, millisecond: number) {
        super(Date)

        this.setHours(hour)
        this.setMinutes(minute)
        this.setSeconds(second)
        this.setMilliseconds(millisecond)
    }

    getDate() {
        return undefined
    }

    getDay() {
        return undefined
    }

    getFullYear() {
        return undefined
    }

    getMonth() {
        return undefined
    }

    getUTCDate() {
        return undefined
    }

    getUTCDay() {
        return undefined
    }

    getUTCFullYear() {
        return undefined
    }

    getUTCMonth() {
        return undefined
    }

    getYear() {
        return undefined
    }

    setDate() {
        return undefined
    }

    setFullYear() {
        return undefined
    }

    setMonths() {
        return undefined
    }

    setUTCDate() {
        return undefined
    }

    setUTCFullYear() {
        return undefined
    }

    setUTCMonth() {
        return undefined
    }

    setYear() {
        return undefined
    }

    toDateString() {
        return undefined
    }

    toString() {
        return this.toTimeString()
    }

    toISOString() {
        // todo timezone? 0-padding.
        return this.getHours.toString() + ':' + this.getMinutes().toString() + ':' + this.getSeconds().toString() + 
            '.' + this.getMilliseconds().toString()
    }

}


class DateOnly extends Date {
    constructor(year: number, month: number, day: number) {
        super(Date)

        this.setFullYear(year)
        this.setMonth(month)
        this.setDate(day)
    }

    getHours() {
        return undefined
    }

    getMilliseconds() {
        return undefined
    }

    getMinutes() {
        return undefined
    }

    getSeconds() {
        return undefined
    }

    getTime() {
        return undefined
    }

    getTimezoneOffset() {
        return undefined
    }

    getUTCHours() {
        return undefined
    }

    getUTCMilliseconds() {
        return undefined
    }

    getUTCMinutes() {
        return undefined
    }

    getUTCSeconds() {
        return undefined
    }

    setHours() {
        return undefined
    }

    setMilliseconds() {
        return undefined
    }

    setMinutes() {
        return undefined
    }

    setSeconds() {
        return undefined
    }

    setTime() {
        return undefined
    }

    setUTCHours() {
        return undefined
    }

    setUTCMilliseconds() {
        return undefined
    }

    setUTCMinutes() {
        return undefined
    }

    setUTCSeconds() {
        return undefined
    }

    toString() {
        return this.toDateString()
    }

    toISOString() {
        // todo 0-pad month and day.
        return this.getFullYear().toString() + '-' + (this.getMonth() + 1).toString() + '-' +
            this.getDate().toString()
    }

    toLocaleTimeString() {
        return undefined
    }

}