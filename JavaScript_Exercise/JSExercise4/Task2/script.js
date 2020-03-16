let students = [
    {
        name: 'Hardik',
        sports: ['Chess', 'Cricket']
    },
    {
        name: 'Ravi',
        sports: ['Cricket', 'Football']
    },
    {
        name: 'Dhairya',
        sports: ['Table_Tennis', 'Chess']
    }
];

let map = new Map();
students.forEach(student => {
    student.sports.forEach(sport => {
        let output = [];
        if(map.has(sport)) {
            let existing = map.get(sport);
            existing.push(student.name);
            map.set(sport, existing);
        } else {
            output.push(student.name);
            map.set(sport, output);
        }
    });
});

let sportsGroup = [];
map.forEach((value, key, map) => {
    sportsGroup.push(
        {
            [key]: value
        }
    );
});

console.log(JSON.stringify(sportsGroup));