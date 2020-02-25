let courses = JSON.parse(localStorage.getItem('courses') || '[]');
let id = 0;
showCourses();
console.log(courses);

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
            courseId: (courses.length===0) ? 1 : (courses[courses.length-1].courseId + 1),
            // courseId: courses.length + 1,
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
        createCourse(courses[i].courseName, courses[i].courseContent, courses[i].courseImage);
    }
}

function createCourse(courseName, courseContent, courseImage) {
    
    const divCol = document.createElement('div');
    divCol.className="col-sm-4 mt-5";
    // divCol.setAttribute('id', ++id);
    const divCard = document.createElement('div');
    divCard.className="card";
    const img = document.createElement('img');
    img.className="card-img";
    img.src=courseImage;
    const divCardBody = document.createElement('div');
    divCardBody.className="card-body";
    const p = document.createElement('p');
    p.className="card-title";
    p.appendChild(document.createTextNode(courseName));
    const a = document.createElement('a');
    // a.href=courseContent;
    a.className="btn btn-primary d-block";
    a.appendChild(document.createTextNode("Assign"));

    divCardBody.appendChild(p);
    divCardBody.appendChild(a);
    divCard.appendChild(img);
    divCard.appendChild(divCardBody);
    divCol.appendChild(divCard);

    document.getElementById('course').appendChild(divCol);

    a.setAttribute('data-target', '#assignModal');
    a.setAttribute('data-toggle', 'modal');

    a.addEventListener('click', function() {
        document.getElementById('studentName').innerHTML = localStorage.getItem('users');
    });
    
}

function removeCourse() {
    const courseName = document.getElementById('courseNameDelete');

    if(courseName.value === '') {
        alert('Fields cannot be empty');
        return false;
    }

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

