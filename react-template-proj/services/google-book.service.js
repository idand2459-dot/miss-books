export const googleBookService = {
    query
}

const demoData = {
    items: [
        {
            id: 'demo101',
            volumeInfo: {
                title: 'The Three Musketeers',
                authors: ['Alexandre Dumas'],
                publishedDate: '1844',
                description: 'A young man travels to Paris to join the Musketeers of the Guard.',
                pageCount: 700,
                categories: ['Fiction'],
                imageLinks: { thumbnail: 'assets/BooksImages/4.jpg' },
                language: 'en'
            }
        },
        {
            id: 'demo102',
            volumeInfo: {
                title: 'The Three Bears',
                authors: ['Robert Southey'],
                publishedDate: '1837',
                description: 'A classic fairy tale about three bears and a curious visitor.',
                pageCount: 32,
                categories: ['Children'],
                imageLinks: { thumbnail: 'assets/BooksImages/9.jpg' },
                language: 'en'
            }
        },
        {
            id: 'demo103',
            volumeInfo: {
                title: 'Three Men in a Boat',
                authors: ['Jerome K. Jerome'],
                publishedDate: '1889',
                description: 'A humorous account of a boating holiday on the Thames.',
                pageCount: 190,
                categories: ['Humor'],
                imageLinks: { thumbnail: 'assets/BooksImages/13.jpg' },
                language: 'en'
            }
        }
    ]
}

function query(txt) {
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${txt}`

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.error) throw new Error(data.error.message)
            return data.items||[]
        })

        .catch(err => {
            console.log('Google Api Failed, using demo data', err.message)
            return demoData.items
        })  
    }