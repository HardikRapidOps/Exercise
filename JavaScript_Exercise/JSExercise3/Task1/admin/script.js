let courses = JSON.parse(localStorage.getItem('courses') || '[]');
let users = JSON.parse(localStorage.getItem('users'));

let isAdmin = sessionStorage.getItem('user');
let isRole = sessionStorage.getItem('role');

if(isAdmin !== null && isRole === 'Admin') {
    document.getElementById('profile').innerHTML = isAdmin + '(admin)';
} else {
    window.location.href = '../login.html';
}

document.getElementById('logout').addEventListener('click', () => {
    sessionStorage.removeItem('user');
    window.location.href = '../login.html';
});

showCourses();

function addCourse() {
    const courseName = document.getElementById('courseName');
    const courseContent = document.getElementById('websiteLink');
    const courseImage = document.getElementById('imageLink');

    if(courseName.value === '' || courseContent.value === '' || courseImage.value === '') {
        alert('Fields cannot be empty');
        return false;
    }

    for(let i = 0; i < courses.length; i++) {
        if(courseName.value === courses[i].courseName) {
            alert(`${courseName.value} already exists`);
            return false;
        }
    }

    courses.push(
        {
            courseId: (courses.length===0) ? 1 : (courses[courses.length-1].courseId + 1),  // courseId: courses.length + 1,
            courseName: courseName.value,
            courseContent: courseContent.value,
            courseImage: courseImage.value
        }
    );

    let myJson = JSON.stringify(courses);

    localStorage.setItem('courses', myJson);
    
    clearAddCourse();

    showCourses();
}

function showCourses() {
    document.getElementById('course').innerHTML = '';
    for(let i = 0; i < courses.length; i++) {
        createCourse(courses[i].courseName, courses[i].courseContent, courses[i].courseImage, courses[i].courseId);
    }
}

function createCourse(courseName, courseContent, courseImage, courseId) {

    const divCol = document.createElement('div');
    divCol.className="col-sm-4 mt-5";
    // divCol.setAttribute('id', ++id);
    const divCard = document.createElement('div');
    divCard.className="card";
    const anchor = document.createElement('a');
    anchor.href = courseContent;
    anchor.target = "_blank";
    const img = document.createElement('img');
    img.className="card-img";
    img.src=courseImage;
    anchor.appendChild(img);
    const divCardBody = document.createElement('div');
    divCardBody.className="card-body";
    const p = document.createElement('p');
    p.className="card-title";
    p.appendChild(document.createTextNode(courseName));
    const a = document.createElement('a');
    a.className="btn btn-primary d-block";
    a.appendChild(document.createTextNode("Assign"));
    a.setAttribute('onclick', `clickCourse(${courseId})`);

    divCardBody.appendChild(p);
    divCardBody.appendChild(a);
    divCard.appendChild(anchor);
    divCard.appendChild(divCardBody);
    divCol.appendChild(divCard);

    document.getElementById('course').appendChild(divCol);

    a.setAttribute('data-target', '#assignModal');
    a.setAttribute('data-toggle', 'modal');
    
    // a.addEventListener('click', clickCourse);
}

function removeCourse() {
    const courseName = document.getElementById('courseNameDelete');

    if(courseName.value === '') {
        alert('Fields cannot be empty');
        return false;
    }

    courses.forEach(course => {
        if(course.courseName === courseName.value) {
            let courseId = course.courseId;
            users.forEach(user => {
                user.courses.forEach((courseAssignedId) => {
                    if(courseAssignedId === courseId) {
                        let position = user.courses.indexOf(courseAssignedId);
                        user.courses.splice(position, 1);
                    }
                });
            });
        }
    });

    localStorage.setItem('users', JSON.stringify(users));

    for(let i = 0; i < courses.length; i++) {
        if(courseName.value === courses[i].courseName) {
            courses.splice(i, 1);

            let myJson = JSON.stringify(courses);
            localStorage.setItem('courses', myJson);
            
            alert(`Removed ${courseName.value} successfully`);

            document.getElementById('courseNameDelete').value = '';

            showCourses();
            return true;
        }
    }
    alert(`${courseName.value} does not exists`);
}

function clearAddCourse() {
    document.getElementById('courseName').value = '';
    document.getElementById('websiteLink').value = '';
    document.getElementById('imageLink').value = '';
}

const clickCourse = (courseId) => {

    // console.log(localStorage.getItem('users'));
    // console.log(JSON.parse(localStorage.getItem('users')));
        
    document.getElementById('studentName').innerHTML = '';

    // let users = JSON.parse(localStorage.getItem('users'));
    // console.log(users[0].userName);
        
    users.forEach(user => {
        if(user.role !== 'Admin') {
            // console.log(user.userName);
                // user.courses.length=0;

            // document.getElementById('studentName').innerHTML += element.userName +  "<br>";
                
            const divMain = document.createElement('div');
            // divMain.className="form-group";
            // divMain.style.justifyContent="between";
            divMain.className="border";
            const divLabel = document.createElement('div');
            divLabel.style.float="left";
                
            const label = document.createElement('label');
            const userNameTextNode = document.createTextNode(user.userName);

            label.appendChild(userNameTextNode);
                
            divLabel.appendChild(label);
                
            const divBtn = document.createElement('div');
            divBtn.style.float="right";
                
            const btnAdd = document.createElement('button');
            btnAdd.textContent="Add";
            btnAdd.className="btn btn-success";
            btnAdd.style.width="86px";
            btnAdd.style.height="38px";
                
            const btnRemove = document.createElement('button');
            btnRemove.textContent="Remove";
            btnRemove.className="btn btn-danger";
                
            divBtn.appendChild(btnAdd);
            divBtn.appendChild(btnRemove);

            divMain.appendChild(divLabel);
            divMain.appendChild(divBtn);
            document.getElementById('studentName').appendChild(divMain);
            // console.log(user.courses.indexOf(courseId));

            if(user.courses.indexOf(courseId) < 0) {
                btnAdd.style.display="";
                btnRemove.style.display="none";
            } else {
                btnAdd.style.display="none";
                btnRemove.style.display="";
            }

            divMain.style.clear="both";

            btnAdd.addEventListener('click', () => {
                addCourseToStudent(btnAdd, btnRemove, courseId);
            });

            btnRemove.addEventListener('click', () => {
                removeCourseToStudent(btnAdd, btnRemove, courseId);
            });
        }

    });
}

const addCourseToStudent = (btnAdd, btnRemove, courseId) => {
        
    const value = event.target.parentNode.previousSibling.firstChild.innerHTML;
    // console.log(value);

    let email;
    for(let i = 0; i < users.length; i++) {
        if(value === users[i].userName) {
            email = users[i].email;
        }
    }

    users.forEach((user) => {
        if(email === user.email) {
            user.courses.push(courseId);
        }
    });

    btnAdd.style.display= "none";
    btnRemove.style.display="initial";

    // localStorage.setItem('users', JSON.stringify(users));
}

const removeCourseToStudent = (btnAdd, btnRemove, courseId) => {
    const value = event.target.parentNode.previousSibling.firstChild.innerHTML;
    // console.log(value);

    let email;
    for(let i = 0; i < users.length; i++) {
        if(value === users[i].userName) {
            email = users[i].email;
        }
    }

    users.forEach(user => {
        if(email === user.email) {
            const position = user.courses.indexOf(courseId);
            user.courses.splice(position, 1);
        }
    });

    btnAdd.style.display="initial";
    btnRemove.style.display="none";

    // localStorage.setItem('users', JSON.stringify(users));
}

const assignCourse = () => {
    localStorage.setItem('users', JSON.stringify(users));
}