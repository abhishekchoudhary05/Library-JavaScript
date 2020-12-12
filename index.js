console.log('Welcome to library.');

class Book {
    constructor(name, author, type){
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

let noOfBooks = 0;

let addBook = window.document.getElementById('addBook');
addBook.addEventListener('click', function(e){
    let name = document.getElementById('bookName');
    let author = document.getElementById('bookAuthor');
    let type;
    let cProgramming = document.getElementById('cProgramming');
    let cppProgramming = document.getElementById('cppProgramming');
    let cSharpProgramming = document.getElementById('cSharpProgramming');
    if(cProgramming.checked){
        type = cProgramming.value;
    }
    else if(cppProgramming.checked){
        type = cppProgramming.value;
    }
    else if(cSharpProgramming.checked){
        type = cSharpProgramming.value;
    }

    let book = new Book(name.value, author.value, type);

    if(validateForm(book)){
        addBookToLibrary(book);
        showMassage('success', 'Your book is added to library.');
    }
    else{
        showMassage('danger', 'Invalid form! please try again.');
    }
    e.preventDefault();
});

function validateForm(book){
    if(book.name.length < 2 || book.author.length < 2){
        return false;
    }
    else{
        return true;
    }
}

function addBookToLibrary(book){
    noOfBooks++;
    let rows = document.getElementById('tableBody');
    rows.innerHTML = rows.innerHTML + `
    <tr>
        <th scope="row">${noOfBooks}</th>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.type}</td>
    </tr>    
    `;
}

function showMassage(msg, description){
    let massage = document.getElementById('massage');
    massage.innerHTML = `
    <div class="alert alert-${msg} alert-dismissible fade show" role="alert">
        <strong>Massage: </strong> ${description}.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>    
    `;
}