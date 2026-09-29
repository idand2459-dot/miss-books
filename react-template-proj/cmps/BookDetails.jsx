import { bookService } from "../services/book.service.js";
import { LongTxt } from "./LongTxt.jsx";    
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
    const yearsAgo = currentYear - publishedDate;

    if (yearsAgo > 10) return "Vintage";
    if (yearsAgo < 1) return "New!";
    return "";
  }

 function getPriceColor(amount) {
    if (amount > 150) return "price-red";
    if (amount < 20) return "price-green";
    return "";
}



  return (
    <section>
      <button onClick={onBack}>Back</button>
      {book && (
        <React.Fragment>
          <h2>{book.title}</h2>
          <h3>{book.subtitle}</h3>
          <LongTxt text={book.description}  />
          <p>Author: {book.authors.join(", ")}</p>
          <p>Categories: {book.categories.join(", ")}</p>
          <p>Published: {book.publishedDate}</p>
          <p>Pages: {book.pageCount}</p>
          <p>
             Price:
             <span className={getPriceColor(book.listPrice.amount)}>
             {book.listPrice.amount} {book.listPrice.currencyCode}
             </span>
             {book.listPrice.isOnSale && <span className="on-sale"> On Sale!</span>}
              </p>
          <p>{getPageCountText(book.pageCount)}</p>
          <p>{getPublishedDateText(book.publishedDate)}</p>
          <img src={book.thumbnail} alt={book.title} />
        </React.Fragment>
      )}
    </section>
  );
}
