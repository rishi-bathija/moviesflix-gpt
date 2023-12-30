export const checkValidateData = (email,password,name,phone) =>{

    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isNameVaild = name ? /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name) : true;
    const isNumVaild = phone ? /^\+?[1-9][0-9]{7,14}$/.test(phone) : true;

    if(!isEmailValid) return "Email ID is not valid";
    if(!isPasswordValid) return "Password is not valid";
    if(!isNameVaild) return "Name is not valid";
    if(!isNumVaild) return "Phone Number not valid";

    return null;
}

