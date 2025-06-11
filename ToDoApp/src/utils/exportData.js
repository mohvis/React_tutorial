import { saveAs } from 'file-saver';  
export const downloadProjectData = (data) => {
  console.log("Downloaded data:", data); // Add this for debugging

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  saveAs(blob, 'project-data.json');
};
