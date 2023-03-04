export function registerValidation(values) {

    let errors = {}

    if (!values.firstName || !stringFieldValidation(values.firstName)) errors.firstName = "Please insert a valid first name!"
    if (!values.lastName || !stringFieldValidation(values.lastName)) errors.lastName = "Please insert a valid last name!"
    if (!values.email || !emailValidaiton(values.email)) errors.email = "Please insert a valid email!"
    if (!values.password || !passwordValidation(values.password)) errors.password = "Password must contain one number, one special character and at least six characters and a max of ten!"

    return errors

}

export function loginValidation(values) {
    let errors = {}

    if (!values.email || !emailValidaiton(values.email)) errors.email = "Please insert a valid email!"
    if (!values.password || !passwordValidation(values.password)) errors.password = "Password must contain one number, one special character and at least six characters and a max of ten!"

    return errors

}

export function eventValidation(values) {
    let errors = {}

    if (!values.title || !stringFieldValidation(values.title)) errors.title = "Please insert a valid title!"
    if (!values.shortDescription || !stringFieldValidation(values.shortDescription)) errors.shortDescription = "Please insert a valid short description!"
    if (!values.longDescription || !stringFieldValidation(values.longDescription)) errors.longDescription = "Please insert a valid long description!"
    if (!values.address || !stringFieldValidation(values.address)) errors.address = "Please insert a valid address!"
    if (!values.organizer || !stringFieldValidation(values.organizer)) errors.organizer = "Please insert a valid organizer!"
    if (!values.date || !stringFieldValidation(values.date)) errors.date = "Please insert a valid date!"
    if (!values.time || !stringFieldValidation(values.time)) errors.time = "Please insert a valid time!"

    return errors

}

export function dateParser(dateTime) {
    const date = new Date(dateTime)
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const hours = date.getHours() === 0 ? "00" : date.getHours()
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    return `${date.getDate()}/${month}/${date.getFullYear()} - ${hours}:${minutes}`
}

function stringFieldValidation(input) {
    return typeof input === "string" && input.trim() !== ""
}

function emailValidaiton(email) {
    return stringFieldValidation(email) && email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/) != null
}

function passwordValidation(input) {
    // password must contain 1 number, 1 special character and at least 6 characters and max of 16
    return stringFieldValidation(input) && input.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) != null
}