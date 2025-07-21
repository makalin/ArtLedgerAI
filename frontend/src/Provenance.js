import React, { useState } from 'react';
import { Button, Typography, Box, TextField } from '@mui/material';
import axios from 'axios';

function Provenance() {
  const [artId, setArtId] = useState('');
  const [history, setHistory] = useState(null);
  const [error, setError] = useState(null);

  const handleQuery = async () => {
    setError(null);
    setHistory(null);
    try {
      const res = await axios.get(`/api/provenance/${artId}`);
      setHistory(res.data.history);
    } catch (err) {
      setError('Query failed.');
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h5">Artwork Provenance</Typography>
      <TextField label="Artwork ID" value={artId} onChange={e => setArtId(e.target.value)} sx={{ mr: 2 }} />
      <Button variant="contained" color="primary" onClick={handleQuery} disabled={!artId}>
        Query
      </Button>
      {history && (
        <Box mt={2}>
          <Typography>Provenance History:</Typography>
          {history.map((h, i) => (
            <Typography key={i}>{h.owner} - {h.date} (Tx: {h.tx})</Typography>
          ))}
        </Box>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}

export default Provenance; 