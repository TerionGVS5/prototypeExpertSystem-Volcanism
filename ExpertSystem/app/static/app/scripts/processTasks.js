
function sendResultAndPageSigns(taskId) {
    sessionStorage.setItem('taskId', taskId); 
    location.href = '/signs';
} // �������� id ��������� ������ ����� ���������� ��������� � ������� �� �������� ������ ���������