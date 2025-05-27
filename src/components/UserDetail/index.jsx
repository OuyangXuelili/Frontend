import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/api/user/${userId}`)
      .then(data => setUser(data))
      .catch(err => console.error("Failed to fetch user", err));
  }, [userId]);

  if (!user) return <Typography>Loading user...</Typography>;

  return (
    <Card sx={{ maxWidth: 500, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="body1">Occupation: {user.occupation}</Typography>
        <Typography variant="body1">Location: {user.location}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {user.description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/photos/${user._id}`}
          sx={{ mt: 2 }}
        >
          View {user.first_name}'s Photos
        </Button>
      </CardContent>
    </Card>
  );
}

export default UserDetail;
