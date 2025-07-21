import React from 'react';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import UploadArtwork from './UploadArtwork';
import Provenance from './Provenance';

function App() {
  const [view, setView] = React.useState('upload');

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ArtLedgerAI
          </Typography>
          <Button color="inherit" onClick={() => setView('upload')}>Upload</Button>
          <Button color="inherit" onClick={() => setView('provenance')}>Provenance</Button>
        </Toolbar>
      </AppBar>
      {view === 'upload' && <UploadArtwork />}
      {view === 'provenance' && <Provenance />}
    </Container>
  );
}

export default App; 