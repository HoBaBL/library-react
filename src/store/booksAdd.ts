import { makeAutoObservable } from "mobx"

type BooksType = {
    name?: string;
    description?: string;
    author?: string;
    id: number
}

class Book {
    books:BooksType[] = JSON.parse(localStorage.getItem('books')!) || [
        {
            name: "Горе от ума",
            description: "«Го́ре от ума́» — комедия в стихах Александра Сергеевича Грибоедова. Сочетает в себе элементы классицизма и новых для начала XIX века романтизма и реализма. Описывает светское общество времён крепостного права и показывает жизнь 1813—1824 годов.",
            id: 1,
            author: "Александр Сергеевич Грибоедов"
        },
        {
            name: "Евгений Онегин",
            description: "«Евге́ний Оне́гин» — роман в стихах русского поэта Александра Сергеевича Пушкина, начат 9 мая 1823 года и закончен 5 октября 1831 года, одно из самых значительных произведений русской словесности.",
            id: 2,
            author: "Александр Сергеевич Пушкин"
        },
    ]

    constructor() {
        makeAutoObservable(this)
        
    }

    addBook(item:BooksType) {
        this.books.unshift(item)
        localStorage.setItem('books', JSON.stringify(this.books))
    }

    deleteBook(id:number) {
        this.books = this.books.filter(book => book.id !== id)
        localStorage.setItem('books', JSON.stringify(this.books))
    }
}

export default new Book()