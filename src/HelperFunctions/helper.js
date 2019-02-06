import { func } from "prop-types";

export function validEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function validPassword(password){
    if(password.length < 8){
        return false
    }
    return true;
}

//reorder the Array
export function reorder(data, index) {
    console.log(data, index)
     return data.slice(index).concat(data.slice(0, index))
   };

//convert millisecond into date and month
export function millisecondsToDate(ms){
    let milliseconds = parseInt(ms, 10);
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let time = new Date(milliseconds);

    let obj = {
        date : time.getDate(),
        month : monthName[time.getMonth()],
        year : time.getFullYear()
    }
    console.log(obj)
    return obj;
}

export function millisecondsToHour(ms){
    let milliseconds = parseInt(ms, 10);
    console.log(milliseconds)
    let hour = new Date(milliseconds).getHours();
    let hourStr = '';
    if(hour > 12){
        hourStr = hour - 12 + " PM";
    }
    else{
        hourStr = hour + " AM";
    }
    console.log(hourStr)
    return hourStr;
}