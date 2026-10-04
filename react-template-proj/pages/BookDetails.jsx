import { bookService } from "../services/book.service.js";
import { LongTxt } from "../cmps/LongTxt.jsx";
import { AddReview } from "../cmps/AddReview.jsx";
import { showSuccessMsg } from "../services/event-bus.service.js";

const { useParams, Link } = ReactRouterDOM;

export function BookDetails() {
  const { bookId } = useParams();
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

  function onAddReview(review) {
    bookService.addReview(bookId, review)
      .then((updatedBook) => {
        setBook(updatedBook);
        showSuccessMsg("Review added successfully");
      });
  }

  function onRemoveReview(reviewId) {
    bookService.removeReview(bookId, reviewId)
      .then((updatedBook) => {  
        setBook(updatedBook);
        showSuccessMsg("Review removed successfully");
      });
  }

  return (
    <section className="book-details">
      {book && (
        <React.Fragment>
          <header className="details-header">
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
          </header>

          <div className="details-body">
            <div className="details-img">
              <img src={book.thumbnail} alt={book.title} />
              {book.listPrice.isOnSale && <span className="on-sale">On Sale!</span>}
            </div>

            <div className="details-info">
              <p>Published: {book.publishedDate} {getPublishedDateText(book.publishedDate)}</p>
              <p>Author: {book.authors.join(", ")}</p>
              <p>Categories: {book.categories.join(", ")}</p>
              <p>Pages: {book.pageCount} {getPageCountText(book.pageCount)}</p>
              <p>
                Price:{" "}
                <span className={getPriceColor(book.listPrice.amount)}>
                  {book.listPrice.amount} {book.listPrice.currencyCode}
                </span>
              </p>

              <Link to="/book" className="back-link">Back to list</Link>

              <LongTxt txt={book.description} />
              <AddReview onAddReview={onAddReview} />
              <ul className="reviews-list">
                {book.reviews && book.reviews.map((review) => (
                  <li key={review.id}> 
                    <p><strong>{review.fullname} </strong></p>
                    <p>Rating: {review.rating}/5</p>
                    <p>Read at: {review.readAt}</p>
                    <p>{review.txt}</p>
                    <button onClick={() => onRemoveReview(review.id)}>Remove Review</button>
                  </li>
                ))}
              </ul>
              
            </div>
          </div>
        </React.Fragment>
      )}
    </section>
  );
}