document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file to convert.');
        return;
    }

    const reader = new FileReader();
    reader.onload = async function() {
        const fileData = reader.result;
        const extension = file.name.split('.').pop();

        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
            convertImageToPDF(fileData);
        } else if (extension === 'doc' || extension === 'docx') {
            convertWordToPDF(fileData);
        } else {
            alert('Unsupported file format. Please select a JPG image or a Word document.');
        }
    };

    reader.readAsDataURL(file);
});

async function convertImageToPDF(imageData) {
    const pdfDoc = await PDFLib.PDFDocument
