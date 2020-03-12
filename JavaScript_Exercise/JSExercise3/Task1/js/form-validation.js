let users = JSON.parse(localStorage.getItem('users') || '[]');
// let users = [];
// console.log(users);
let role;

// ------------------------------------------------------------ REGISTRATION ------------------------------------------------------------

function registrationFormValidation() {
    const uname = document.registration.userName;   // document.forms["registration"]["userName"]
    const uemail = document.registration.email;
    const passid = document.registration.password;
    const confirmpassid = document.registration.confirmPassword;
    const utype = document.registration.role;

    if(allLetter(uname)) {
        if(ValidateEmail(uemail)) {
            if(passid_validation(passid, 7, 12)) {
                if(confirmpassid_validation(passid, confirmpassid, 7, 12)) {
                    if(validUser(utype)) {
                        for(let i = 0; i < users.length; i++) {
                            if(uemail.value === users[i].email) {
                                alert('User already exists');
                                return false;
                            } 
                        }
                        
                        users.push(
                            {
                                id: (users.length===0) ? 1 : (users[users.length-1].id + 1),   // id: users.length+1,
                                userName: uname.value,
                                email: uemail.value,
                                password: passid.value,
                                role: role.value,
                                courses: []
                            }
                        );

                        let myJson = JSON.stringify(users);
                        localStorage.setItem('users', myJson);

                        alert('Form successfully submitted');
                        window.location.reload();

                        // window.location.href = "/Task1/login.html";
                        return true;
                    }
                }
            }
        }
    }

    return false;
}

function allLetter(uname) {
    const letters = /^[A-Za-z\s]+$/;
    if((uname.value.match(letters)) && (uname.value.trim() !== '')) {
        return true;
    } else {
        alert("Username must have alphabet characters only");
        uname.focus();
        return false;
    }
}

function ValidateEmail(uemail) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(uemail.value.match(mailformat)) {
        return true;
    } else {
        alert("You have entered an invalid email address!");
        uemail.focus();
        return false;
    }
}

function passid_validation(passid, mx, my) {
    const passid_len = passid.value.length;
    if(passid_len == 0 || passid_len >= my || passid_len <= mx || passid.value.trim() === '') {
        alert("Password should not be empty / length be between " + mx + " to " + my);
        passid.focus();
        return false;
    }
    return true;
}

function confirmpassid_validation(passid, confirmpassid, mx, my) {
    if(passid_validation(confirmpassid, mx, my)) {
        if(passid.value === confirmpassid.value) {
            return true;
        } else {
            alert("Password and ConfirmPassword does not match");
            confirmpassid.focus();
            return false;
        }
    }
    return false;
}

function validUser(utype) {
    for(let i = 0; i < utype.length; i++) {
        if(utype[i].checked) {
            role = utype[i];
            return true;
        } 
    }
    alert('Select Admin/Student');
    utype[0].focus();
    return false;
}

// ------------------------------------------------------------ LOGIN ------------------------------------------------------------

function loginFormValidation() {
    event.preventDefault();
    const uemail = document.login.email;
    const passid = document.login.password;

    for(let i = 0; i < users.length; i++) {
        if(uemail.value == users[i].email) {
            if(passid.value == users[i].password) {
                alert('Login successful');
                if(users[i].role === 'Admin') {
                    sessionStorage.setItem('user', users[i].userName);
                    sessionStorage.setItem('role', users[i].role);
                    window.location.href = "/JSExercise3/Task1/admin/index.html";
                } else {
                    sessionStorage.setItem('user', users[i].userName);
                    sessionStorage.setItem('role', users[i].role);
                    window.location.href = "/JSExercise3/Task1/user/index.html";
                }
                return true;
            } 
            alert('Password is incorrect');
            return false;
        }
    }
    alert('Email is incorrect');
    return false;
}