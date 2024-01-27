import React from 'react';
import FileExplorer from './FileExplorer';
import mockData from './mockData';

function App() {
  return (
    <div className="App">
      <FileExplorer data={mockData} />
    </div>
  );
}

export default App;
