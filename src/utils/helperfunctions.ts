export const formatPhoneInput = (newTxt: string, dashPos: number[]) => {
    newTxt = newTxt.replace(/-/g, "");
    dashPos.forEach((value, indx) => {
      if (newTxt.length >= dashPos[indx]) {
        newTxt =
          newTxt.slice(0, dashPos[indx] - 1) +
          "-" +
          newTxt.slice(dashPos[indx] - 1);
      }
    });
    return newTxt;
  };

export const formatNumberCommaNoDecimals = (amount: any) => {
    if(amount=="")
    {
        return "";
    }
    var formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
    return formatter.format(amount)
}

export const formatNumberComma = (amount: any) => {
    var formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4,
    })
    return formatter.format(amount)
}

export const formatDollar = (amount: any) => {
    if(amount=="")
    {
        return "";
    }
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 4,
    })
    return formatter.format(amount)
}

export const formatDollarDigits = (amount: any, digitsafter: any) => {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: digitsafter,
        maximumFractionDigits: digitsafter,
    })
    return formatter.format(amount)
}

export const formatDate = (dt: Date, stringformat: string) => {
    let strformat = ''
    for (let i = 0; i < stringformat.length; i++)
        strformat += char2num(dt, stringformat[i])
    return strformat
}

export const char2num = (dt: Date, c: string) => {
    switch (c) {
        case 'Y':
        return dt.getFullYear()
        case 'y':
        let y = dt.getFullYear()
        y = y % 100
        return y
        case 'M':
        let mth = dt.getMonth() + 1
        let sMth = mth.toString()
        if (mth < 10) {
            sMth = '0' + sMth
        }
        return sMth
        case 'd':
        let day = dt.getDate()
        let sDay = day.toString()
        if (day < 10) {
            sDay = '0' + sDay
        }
        return sDay
        case 'h':
        return dt.getHours()
        case 'm':
        return dt.getMinutes()
        case 's':
        return dt.getSeconds()
        case 'f':
        return dt.getMilliseconds()
        default:
        return c
    }
}

export function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}