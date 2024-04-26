import getData from "./getData.js";

const elements = {
    myshelf: document.querySelector('[data-name="myshelf"]'),
    search: document.querySelector('[data-name="search"]'),
    selectElement: document.querySelector('[data-author]')
};

const params = new URLSearchParams(window.location.search);
const bookTitle = params.get('name');

function createSearchBookList(element, data) {
    if (data.length == null) {
        return;
    }
    const ulExist = element.querySelector('ul');
    document.getElementById("search").classList.remove('hidden');

    if (ulExist) {
        element.removeChild(ulExist);
    }

    const ul = document.createElement('ul');
    ul.className = 'book-list';
    const listHTML = data.map(book => `
        <li>
            <a href="/search_details.html?name=${book.title.replace(" ", "%20")}&id=${book.id}">
                <img src="${book.poster_url}" alt="${book.title}">
            </a>
        </li>
    `).join('');
    ul.innerHTML = listHTML;
    element.appendChild(ul);
}

function createSelfBooksList(element, data) {

    const ulExist = element.querySelector('ul');
    if (ulExist) {
        element.removeChild(ulExist);
    }

    const ul = document.createElement('ul');
    ul.className = 'book-list';
    const listHTML = data.map(book => `
        <li>
            <a href="/details.html?id=${book.id}">
                <img src="${book.poster_url}" alt="${book.title}">
            </a>
        </li>
    `).join('');
    ul.innerHTML = listHTML;
    element.appendChild(ul);
}

function getAuthors() {
    const url = "/books/self/authors";
    getData(url)
        .then(data => {
            console.log(`Authors: ${data}`);
            generateAuthorsOption(elements.selectElement, data)
        })
        .catch(error => {
            console.error("Error to get shelf data: ", error);
        })
}

function generateAuthorsOption(element, data) {
    element.classList.remove("hidden");

    const defaultOption = document.createElement('option');
    defaultOption.value = "all";
    defaultOption.textContent = "All Books";
    element.appendChild(defaultOption);

    data.forEach(author => {
        const option = document.createElement('option');
        option.value = author.id;
        option.textContent = author.name;
        element.appendChild(option);
    });
}

const elementsToHide = document.querySelectorAll('.book-list');

elements.selectElement.addEventListener('change', function() {
    const sectionAuthor = document.querySelector('[data-name="author"]');
    const selectedAuthor = elements.selectElement.value;


    if (selectedAuthor === "all") {
        for (const element of elementsToHide) {
            element.classList.remove('hidden');
        }
        sectionAuthor.classList.add('hidden');
        document.getElementById("search").classList.remove('hidden'); // SEARCH RESULT
    } else {

        for (const element of elementsToHide) {
            element.classList.add('hidden');
        }
        document.getElementById("search").classList.add('hidden'); // SEARCH RESULT
        sectionAuthor.classList.remove('hidden');

        getData(`/books/self/author/${selectedAuthor}`)
            .then(data => {
                createSelfBooksList(sectionAuthor, data);
            })
            .catch(error => {
                console.error("Error to get books from author value: ", error);
            })
    }
    
});

getAuthors(); // SELECT FROM SECTION MY SHELF
generateBooks();

function generateBooks() {
    if (bookTitle != null) {
        const url = `/books/${bookTitle}`;
        getData(url)
            .then(data => {
                console.log(data);
                createSearchBookList(elements.search, data);
            })
            .catch(error => {
                console.error("Error to get search data: ", error);
            })
    }
    const url = `/books/self/all`;
    getData(url)
        .then(data => {
            console.log(`My shelf: ${data}`);
            createSelfBooksList(elements.myshelf, data);
        })
        .catch(error => {
            console.error("Error to get shelf data: ", error);
        })
}

