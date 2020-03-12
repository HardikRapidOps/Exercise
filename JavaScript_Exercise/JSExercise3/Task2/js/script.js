const names = ['Ashish Shah', 'Rashmin Chhatrala', 'Yash Dubey', 'Prakash Jain', 'Yashraj Singh', 'Viraj Sinha', 'Rajesh Kumar', 'Mahesh Marwadi', 'Suresh Sahni', 'Amar Vilas', 'Virdas Singhania', 'Rajeshwari Bindra', 'Birendra Bhalerao', 'Virendra Bhupati', 'Bhupendra Singh', 'Bhuvam Bam', 'Shri Raj', 'Prashant Kamle', 'Kamlesh Tomar', 'Risabh Khare', 'Rishi Kohli', 'Kunwar Kharwanda', 'Kartik Koli', 'Komal Jain', 'Kartikey Pandey'];

document.getElementById('name').addEventListener('input', () => {
    document.getElementById('display').innerHTML = '';
    let i = 0;
    const inputName = document.getElementById('name');

    const filtered = names.filter(name => name.toUpperCase().includes(inputName.value.toUpperCase()));

    console.log(filtered);

    filtered.forEach(name => {
        const position = name.toUpperCase().indexOf(inputName.value.toUpperCase());
        const charCount = inputName.value.length;
        
        let match = name.substr(position, charCount);

        document.getElementById('display').innerHTML += name.substr(0, position) + '<span class="yellow">' + match + '</span>' + name.substr(position+charCount) + '<br>';
    });

});