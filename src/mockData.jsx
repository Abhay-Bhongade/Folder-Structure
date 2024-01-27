const mockData = {
    name: 'root',
    type: 'folder',
    children: [
      {
        name: 'documents',
        type: 'folder',
        children: [
          { name: 'resume.txt', type: 'file' },
          { name: 'report.docx', type: 'file' },
        ],
      },
      {
        name: 'images',
        type: 'folder',
        children: [
          { name: 'vacation.jpg', type: 'file' },
          { name: 'family.png', type: 'file' },
        ],
      },
    ],
  };
  
  export default mockData;
  