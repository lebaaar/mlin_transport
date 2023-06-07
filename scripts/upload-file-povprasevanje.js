var dropZone = document.getElementById('drop-zone-povprasevanje');
var fileInfo = document.getElementById('file-info');
var errorMessage = document.getElementById('error-message');
var fileInput = document.getElementById('attachment');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('dragleave', handleDragLeave, false);
dropZone.addEventListener('drop', handleFileSelect, false);
fileInput.addEventListener('change', handleFileChange, false);
function handleDragOver(e) {
    e.preventDefault();
    dropZone.classList.add('highlight');
}
function handleDragLeave(e) {
    e.preventDefault();
    dropZone.classList.remove('highlight');
}
function handleFileSelect(e) {
    e.preventDefault();
    dropZone.classList.remove('highlight');
    var file = e.dataTransfer.files[0];
    displayFileInfo(file);
    fileInput.files = e.dataTransfer.files;
    validateForm();
}
function handleFileChange(e) {
    var file = e.target.files[0];
    displayFileInfo(file);
    validateForm();
}
function displayFileInfo(file) {
    fileInfo.innerHTML = '';
    if (file) {
        var fileName = file.name;
        var fileType = file.type;
        var fileSize = formatFileSize(file.size);
        var supportedTypes = ["image/jpeg", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
        if (supportedTypes.includes(fileType)) {
            fileInfo.innerHTML = `Naložena datoteka: ${fileName} (${fileSize})`;
            errorMessage.innerHTML = '';
        } else {
            fileInfo.innerHTML = `Nepodprta vrsta datoteke. Prosimo izberite vrsto datoteke: .jpg, .jpeg, .png, .pdf, .doc, .docx,`;
            errorMessage.innerHTML = 'Prosimo izberite veljavno datoteko.';
        }
    }
}
function formatFileSize(size) {
    if (size === 0) return '0 Bytes';
    var units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return parseFloat((size / Math.pow(1024, i)).toFixed(2)) + ' ' + units[i];
}
function validateForm() {
    var supportedTypes = ["image/jpeg", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
    var maxFileSize = 10 * 1024 * 1024; // 10 MB file size limit 

    if (fileInput.files.length === 1 && supportedTypes.includes(fileInput.files[0].type) && fileInput.files[0].size <= maxFileSize) {
        errorMessage.innerHTML = '';
    } else {
        if (fileInput.files.length === 1 && fileInput.files[0].size > maxFileSize) {
            errorMessage.innerHTML = 'Presežena omejitev velikosti datoteke. Največja dovoljena velikost je 10 MB.';
        } else {
            errorMessage.innerHTML = 'Prosimo izberite veljavno datoteko.';
        }    
    }
}