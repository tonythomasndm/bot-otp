function Validation(values){
    
    let error ={}
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ;

    if(values.name === ""){
        error.name = " Name should not be empty"
    }else{
        error.name = ""
    }

    if (!email_pattern.test(values.email)) {
        error.email= 'Please enter a valid email address'
    } else if(values.email===""){
            error.email= "Name should not be empty"
    }
    else {
        error.email = '';
    }

    if(values.password===""){
        error.password= "Password whould not be Empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password = " Password must must contain a Capital letter, a numeric, a symbol"
    }
    else{
        error.password = ""
    }
    if (values.password !== values.confirmPassword) {
        error.confirmPassword = 'Password do not match';
    }
    else{
        error.confirmPassword = ""
    }
    return error;


}

export default Validation;