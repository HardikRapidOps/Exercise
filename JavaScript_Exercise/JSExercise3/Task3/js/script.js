window.onload = () => {
    // alert('Greetings Mr. X Please choose the surprise box');
    const p = document.createElement('p');
    const text = document.createTextNode('Click Me First');
    p.appendChild(text);
    document.getElementById('box-1').appendChild(p);

    let i = 0;
    setInterval(() => {
        const color  = ['red', 'green', 'yellow'];
        document.getElementById('box-2').style.backgroundColor = color[i];
        i++;
        if(i > color.length-1) i = 0;
        // i = (i + 1) % color.length;
    }, 3000);
}


document.getElementById('box-1').addEventListener('click', () => {
    document.getElementById('box-3').innerHTML += 'Oops! something wrong?'
});


let i, next, prev;
const color = ['coral', 'aqua', 'teal', 'hotpink', 'violet'];
document.addEventListener('keydown', event => {
    if(event.code == 'ArrowRight' || event.code == 'ArrowUp') {
        clearInterval(prev);
        clearInterval(next);
        i = 0;
        next = setInterval(() => {
            document.getElementById('box-4').style.backgroundColor = color[i];
            i++;
            if(i > color.length-1) i = 0;
        }, 3000);
    } 
    if(event.code == 'ArrowLeft' || event.code == 'ArrowDown') {
        clearInterval(next);
        clearInterval(prev);
        i = color.length - 1;
        prev = setInterval(() => {
            document.getElementById('box-4').style.backgroundColor = color[i];
            i--;
            if(i < 0) i = color.length - 1;
        }, 5000);
    }
});