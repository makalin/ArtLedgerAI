import React, { useState } from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

function UploadArtwork() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('/api/upload', formData);
      setResult(res.data);
    } catch (err) {
      setError('Upload failed.');
    }
    setLoading(false);
  };

  return (
    <Box mt={4}>
      <Typography variant="h5">Upload Artwork</Typography>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload} disabled={!file || loading} sx={{ ml: 2 }}>
        Upload
      </Button>
      {loading && <CircularProgress sx={{ ml: 2 }} />}
      {result && (
        <Box mt={2}>
          <Typography>AI Result: {result.result.details}</Typography>
          <Typography>Authentic: {result.result.authentic ? 'Yes' : 'No'}</Typography>
          <Typography>Confidence: {result.result.confidence}</Typography>
          <Typography>Blockchain Tx: {result.tx_hash}</Typography>
        </Box>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}

export default UploadArtwork; 