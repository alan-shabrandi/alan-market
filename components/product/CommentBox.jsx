import { Rating } from "@material-ui/lab";
import { ListItem, Typography } from "@material-ui/core";
import { jalaliDate } from "../../utils/jalaliDate";

const CommentBox = ({ comment }) => {
  let ratingColor;
  switch (comment.rating) {
    case 1:
      ratingColor = "#f9bc00";
      break;
    case 2:
      ratingColor = "#b1b64d";
      break;
    case 3:
      ratingColor = "#b1b64d";
      break;
    case 4:
      ratingColor = "#00a049";
      break;
    case 5:
      ratingColor = "#00a049";
      break;
    default:
      break;
  }

  return (
    <ListItem className="product-comment">
      <header className="product-comment__header">
        <Typography
          className="product-rating-number"
          style={{ backgroundColor: `${ratingColor}` }}
        >
          {comment.rating}
        </Typography>
        <Rating
          value={comment.rating}
          readOnly
          className="product-rating-stars"
        />
        <Typography className="product-comment-date">
          {jalaliDate(comment.createdAt)}
        </Typography>
        <Typography className="product-comment-username">
          {comment.name}
        </Typography>
      </header>
      <main className="product-comment__comment">{comment.comment}</main>
    </ListItem>
  );
};

export default CommentBox;
