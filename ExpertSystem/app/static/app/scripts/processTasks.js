
function sendResultAndPageSigns(taskId) {
    sessionStorage.setItem('taskId', taskId); 
    location.href = '/signs';
} // Передача id выбранной задачи через сессионное хранилище и переход на страницу выбора признаков