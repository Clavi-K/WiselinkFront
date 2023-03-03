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