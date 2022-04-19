import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitCommentHandler } from "../../redux/actions/product";
import LoadingSpinner from "../common/spinners/LoadingSpinner";
import CommentBox from "./CommentBox";

const Comments = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { userInfo } = useSelector((state) => state.user);
  const { comments, loadingCreate } = useSelector((state) => state.product);
  const handleClickOpen = () => {
    if (!userInfo)
      return router.push(
        `/login?redirect=/product/${product.id}/${product.slug}`
      );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <List className="product-comments">
      <ListItem>
        <Typography name="comments" id="comments" variant="h2">
          دیدگاه ها
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          ثبت دیدگاه
        </Button>
      </ListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          دیدگاه خود را نسبت به این محصول بنویسید
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={(event) =>
              submitCommentHandler(
                event,
                product,
                { comment, rating },
                dispatch,
                enqueueSnackbar,
                setOpen,
                setComment,
                setRating
              )
            }
          >
            <List>
              <ListItem>
                <TextField
                  variant="outlined"
                  placeholder="دیدگاه شما..."
                  fullWidth
                  name="comment"
                  multiline
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </ListItem>
              <ListItem>
                <Rating
                  name="rating"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </ListItem>
              <ListItem>
                {loadingCreate ? (
                  <LoadingSpinner />
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                  >
                    ثبت دیدگاه
                  </Button>
                )}
              </ListItem>
            </List>
          </form>
        </DialogContent>
      </Dialog>
      {comments.length === 0 ? (
        <ListItem>نظری وجود ندارد</ListItem>
      ) : (
        comments.map((comment) => (
          <CommentBox key={comment._id} comment={comment} />
        ))
      )}
    </List>
  );
};

export default Comments;
