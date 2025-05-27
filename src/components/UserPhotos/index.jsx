import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BASE_URL from "../../config";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

function UserPhotos({ user }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchModel(`/api/user/${userId}`)
      .then((data) => setUserInfo(data))
      .catch((err) => console.error("Failed to fetch user", err));

    fetchPhotos();
  }, [userId]);

  const fetchPhotos = () => {
    fetchModel(`/api/photo/photosOfUser/${userId}`)
      .then((data) => {
        console.log("✅ Photos fetched:", data);
        setPhotos(data);
      })
      .catch((err) => console.error("Failed to fetch user photos", err));
  };

  const handleCommentChange = (photoId, text) => {
    setCommentInputs({ ...commentInputs, [photoId]: text });
  };

  const handleSubmitComment = async (photoId) => {
    const commentText = commentInputs[photoId];
    if (!commentText || commentText.trim() === "") return;

    try {
      const res = await fetch(`${BASE_URL}/api/comment/commentsOfPhoto/${photoId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ comment: commentText })
      });

      if (!res.ok) throw new Error(await res.text());

      const newComment = await res.json();
      console.log("🔍 New comment from server:", newComment);

      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo._id === photoId
            ? { ...photo, comments: [...photo.comments, newComment] }
            : photo
        )
      );

      setCommentInputs({ ...commentInputs, [photoId]: "" });
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  if (!userInfo) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Typography variant="h5" sx={{ m: 2 }}>
        Photos of {`${userInfo.first_name} ${userInfo.last_name}`}
      </Typography>

      {photos.map((photo) => (
        <Card key={photo._id} sx={{ maxWidth: 600, margin: 2 }}>
          <CardMedia
            component="img"
            image={`${BASE_URL}/images/${photo.file_name}`}
            alt="User uploaded"
          />
          <CardContent>
            <Typography variant="subtitle2">
              Uploaded: {formatDate(photo.date_time)}
            </Typography>

            {photo.comments?.length > 0 && (
              <>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Comments:
                </Typography>
                <List>
                  {photo.comments.map((cmt) => (
                    <React.Fragment key={cmt._id}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            cmt.user_id?.first_name ? (
                              <Link to={`/users/${cmt.user_id._id}`}>
                                {`${cmt.user_id.first_name} ${cmt.user_id.last_name || ""}`}
                              </Link>
                            ) : (
                              "Unknown user"
                            )
                          }
                          secondary={
                            <>
                              {cmt.comment}
                              <br />
                              <i>{formatDate(cmt.date_time)}</i>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </>
            )}

            {user && (
              <>
                <TextField
                  label="Add a comment"
                  fullWidth
                  value={commentInputs[photo._id] || ""}
                  onChange={(e) => handleCommentChange(photo._id, e.target.value)}
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={() => handleSubmitComment(photo._id)}
                  sx={{ mt: 1 }}
                >
                  Submit
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
