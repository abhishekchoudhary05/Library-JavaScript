console.log('Welcome to library.');
showAllBooks();

class Book {
    constructor(id, name, author, type){
        this.id = id;
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

    let books = window.localStorage.getItem('books');
    if(books == null){
        lStorage = [];
    }
    else{
        lStorage = JSON.parse(books); 
    }
    let book = new Book(lStorage.length + 1, name.value, author.value, type);

    if(validateForm(book)){
        addBookToLibrary(book);
        showMassage('success', 'Your book is added to library.');

        let libraryBooks = document.getElementById('libraryBooks');
        libraryBooks.reset();
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
    let books = window.localStorage.getItem('books');
    if(books == null){
        lStorage = [];
    }
    else{
        lStorage = JSON.parse(books); 
    }
    lStorage.push(JSON.stringify(book));
    window.localStorage.setItem('books', JSON.stringify(lStorage));
    showAllBooks();
}

function showAllBooks(){
    let books = window.localStorage.getItem('books');
    if(books == null){
        lStorage = [];
    }
    else{
        lStorage = JSON.parse(books); 
    }

    let rows = document.getElementById('tableBody');
    let row = '';
    if(lStorage.length == 0){
        row = row + `
            <tr>No records to display.</tr>        
        `;
    }
    else{
        Array.from(lStorage).forEach(function(ele){
            ele = JSON.parse(ele);
            row = row + `
            <tr>
                <th scope="row">${ele.id}</th>
                <td>${ele.name}</td>
                <td>${ele.author}</td>
                <td>${ele.type}</td>
            </tr>    
            `;
        });            
    }
    rows.innerHTML = row;
}

function showMassage(msg, description){
    let massage = document.getElementById('massage');
    massage.innerHTML = `
    <div class="alert alert-${msg} alert-dismissible fade show" role="alert">
        <strong>Massage: </strong> ${description}.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>    
    `;
    setTimeout(function(){
        massage.innerHTML = ''
    }, 2000);
}

let deleteRow = document.getElementById('deleteRow');
deleteRow.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        let books = window.localStorage.getItem('books');
        if(books == null){
            lStorage = [];
            showMassage('danger', 'No book record to delete.');
            return;
        }
        else{
            lStorage = JSON.parse(books); 
        }

        if(isIdPresent(deleteRow.value)){
            let temp = [];
            Array.from(lStorage).forEach(function(element){
                element = JSON.parse(element);
                if(element.id != deleteRow.value){
                    temp.push(JSON.stringify(element));                
                }
            });
            window.localStorage.setItem('books', JSON.stringify(temp));
            showMassage('success', 'Book deleted successfully.');
            showAllBooks();
        }
        else{
            showMassage('warning', 'Book Not Present.');
        }
    }
});

function isIdPresent(index){
    let status = false;
    let books = window.localStorage.getItem('books');
    if(books == null){
        lStorage = [];
    }
    else{
        lStorage = JSON.parse(books); 
    }
    Array.from(lStorage).forEach(function(element){
        element = JSON.parse(element);
        if(element.id == index){
            status = true;
        }
    });
    return status;
}