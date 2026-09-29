import { bookService } from "../services/book.service.js";
export function BookDetails({ onBack, bookId }) {
  const [book, setBook] = React.useState(null);

  React.useEffect(() => {
    bookService.get(bookId)
    .then((bookFromStorage) => setBook(bookFromStorage));
  }, [bookId]);

  function getPageCountText(pageCount) {
    if (pageCount > 500) return "Serious reading";
    if (pageCount > 200) return "Decent reading";
    if (pageCount < 100) return "Light reading";
    return "";
  }

  function getPublishedDateText(publishedDate) {
    const currentYear = new Date().getFullYear();
    const publishedYear = new Date(publishedDate).getFullYear();
    const yearsAgo = currentYear - publishedDate;

    if (yearsAgo > 10) return "Veteran Book";
    if (yearsAgo < 1) return "New!";
    return "";
  }

  return (
    <section>
      <button onClick={onBack}>Back</button>
      {book && (
        <>
          <h2>{book.title}</h2>
          <h3>{book.subtitle}</h3>
          <p>{book.description}</p>
          <p>Author: {book.authors.join(", ")}</p>
          <p>Categories: {book.categories.join(", ")}</p>
          <p>Published: {book.publishedDate}</p>
          <p>Pages: {book.pageCount}</p>
          <p> Price: {book.listPrice.amount} {book.listPrice.currencyCode} </p>
          <p>{getPageCountText(book.pageCount)}</p>
          <p>{getPublishedDateText(book.publishedDate)}</p>
          <img src={book.thumbnail} alt={book.title} />
        </>
      )}
    </section>
  );
}
