let courses = JSON.parse(localStorage.getItem('courses'));
let users = JSON.parse(localStorage.getItem('users'));

let isUser = sessionStorage.getItem('user');
let isRole = sessionStorage.getItem('role');

if(isUser !== null && isRole === 'Student') {
    document.getElementById('profile').innerHTML = isUser + '(user)';
} else {
    window.location.href = '../login.html';
}

document.getElementById('logout').addEventListener('click', () => {
    sessionStorage.removeItem('user');
    window.location.href = '../login.html';
});

const showCourses = () => {

    users.forEach(user => {
        if(user.userName === isUser) {
            user.courses.forEach(courseId => {
                courses.forEach(course => {
                    if(courseId === course.courseId) {
                        createCourse(course.courseName, course.courseContent, course.courseImage, course.courseId);
                    }
                });
            });
        }
    });

}

function createCourse(courseName, courseContent, courseImage, courseId) {

    const divCol = document.createElement('div');
    divCol.className="col-sm-4 mt-5";
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

    divCardBody.appendChild(p);
    divCard.appendChild(anchor);
    divCard.appendChild(divCardBody);
    divCol.appendChild(divCard);

    document.getElementById('course').appendChild(divCol);
}

showCourses();