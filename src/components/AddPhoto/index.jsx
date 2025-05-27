import {
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from '../../config'; // ✅ đúng


const AddPhoto = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a photo");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      const res = await fetch(`${BASE_URL}/api/photo/photos/new`, {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();
      console.log("Upload success:", result);
      navigate(`/photos/${user._id}`);
    } catch (err) {
      setError("Upload failed: " + err.message);
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 500, margin: "auto", mt: 5 }}>
      <Typography variant="h5">Upload a Photo</Typography>
      <Box mt={2}>
        <TextField
          type="file"
          inputProps={{ accept: "image/*" }}
          onChange={handleFileChange}
          fullWidth
        />
      </Box>
      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleUpload}>
        Upload
      </Button>
    </Paper>
  );
};

export default AddPhoto;
