function Book(title, author, pages){
    if(!new.target)
        throw Error("You muse use new to call this function !");

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
    this.info = function(){
        return `The ${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? 'has been read' : 'not read yet'}.`;
    }
}

module.exports = Book;


