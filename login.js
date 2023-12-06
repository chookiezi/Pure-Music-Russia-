document.addEventListener('DOMContentLoaded', function () {
    const loginInput = document.getElementById('loginInput');
    const passwordInput = document.getElementById('passwordInput');
    const loginSubmitBtn = document.getElementById('loginSubmitBtn');
    const errorContainer = document.getElementById('errorContainer');
    const modalContent = document.querySelector('.modal-content__login');
    const dataContainer = document.getElementById('dataContainer');
    const loginModal__ = document.getElementById('loginModal');
    const correctLogin = 'Pure_adm';
    const correctPassword = 'Pure123';

    const fieldNames = {
        input1: 'Название',
        input2: 'Автор(ы)',
        input3: 'Продюссер(ы)',
        select1: 'Плейлист',
        image1: 'Обложка',
        input6: 'Описание',

    };

    const fieldMapping = {
        
        option1: 'Мейнстрим',
        option2: 'Гиперпоп',
        option3: 'Хип-Хоп',
        option4: 'Не помню что там ',
        option5: 'Альтернатива',
        all: 'Все жанры'
    };

    loginSubmitBtn.addEventListener('click', function () {
        const enteredLogin = loginInput.value;
        const enteredPassword = passwordInput.value;

        if (enteredLogin === correctLogin && enteredPassword === correctPassword) {
            loginModal__.classList.add('hide-modal');
            modalContent.classList.add('hide-modal');
            displayData();
            showSuccessMessage('Вход выполнен успешно!');
        } else {
            errorContainer.textContent = 'Неправильный логин и/или пароль';
            errorContainer.classList.add('show-error');
        }
    });

    function showSuccessMessage(message) {
        const successMessageContainer = document.createElement('div');
        successMessageContainer.classList.add('success-message');
        successMessageContainer.textContent = message;
        document.body.appendChild(successMessageContainer);

        setTimeout(function () {
            successMessageContainer.style.opacity = '0';
            setTimeout(function () {
                document.body.removeChild(successMessageContainer);
            }, 1000);
        }, 3000);
    }

    function displayData(filteredData) {
        const savedData = filteredData || JSON.parse(localStorage.getItem('formDataArray')) || [];
        dataContainer.innerHTML = '';

        if (savedData.length > 0) {
            savedData.forEach((data, index) => {
                const table = document.createElement('table');
                table.classList.add('data-table');

                const headerRow = table.createTHead().insertRow(0);
                const columnNames = Object.keys(data);

                columnNames.forEach(columnName => {
                    const th = document.createElement('th');
                    th.textContent = fieldNames[columnName] || columnName;
                    headerRow.appendChild(th);
                });

                const tbody = table.createTBody();
                const row = tbody.insertRow(0);

                columnNames.forEach(columnName => {
                    const cell = row.insertCell();
                    cell.textContent = data[columnName];
                });

                const statusCell = row.insertCell();
                statusCell.textContent = 'На модерации';
                statusCell.classList.add('pending');

                const verificationCheckbox = document.createElement('input');
                verificationCheckbox.type = 'checkbox';
                verificationCheckbox.addEventListener('change', function () {
                    handleVerificationChange(index, verificationCheckbox.checked);
                });

                const checkboxLabel = document.createElement('label');
                checkboxLabel.textContent = 'Верификация';
                checkboxLabel.appendChild(verificationCheckbox);

                row.appendChild(checkboxLabel);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Удалить';
                deleteButton.classList.add('btn-delete-th');
                deleteButton.addEventListener('click', function () {
                    handleDelete(index);
                });
                row.appendChild(deleteButton);

                dataContainer.appendChild(table);
            });

            let buttonContainer = document.createElement('div');
            buttonContainer.classList.add('gth__adm');

            let linkText = document.createElement('span');
            linkText.classList.add('home');
            linkText.textContent = 'На главную';
            buttonContainer.appendChild(linkText);

            buttonContainer.addEventListener('click', function (event) {
                if (event.target.classList.contains('home')) {
                    window.location.href = '/';
                }
            });

            let genreFilter = document.createElement('select');
            genreFilter.classList.add('genre-filter');
            let allGenresOption = document.createElement('option');
            allGenresOption.value = 'all';
            allGenresOption.textContent = 'Все жанры';
            genreFilter.appendChild(allGenresOption);

            for (let genre in fieldMapping) {
                let genreOption = document.createElement('option');
                genreOption.value = genre;
                genreOption.textContent = fieldMapping[genre];
                genreFilter.appendChild(genreOption);
            }

            genreFilter.addEventListener('change', function () {
                filterDataByGenre(this.value);
            });

            buttonContainer.appendChild(genreFilter);

            dataContainer.appendChild(buttonContainer);
        } else {
            dataContainer.innerHTML = 'Нет заявок на рассмотрение';
            let linkElement = document.createElement('a');
            linkElement.classList.add('gth');
            linkElement.href = '/';
            linkElement.textContent = 'На главную';

            dataContainer.appendChild(linkElement);
        }
    }

    function handleVerificationChange(index, isChecked) {
        const savedData = JSON.parse(localStorage.getItem('formDataArray')) || [];
        const updatedData = [...savedData];
        const data = savedData[index];

        if (isChecked) {
            const verificationKey = 'verifiedDataArray';
            const verifiedData = JSON.parse(localStorage.getItem(verificationKey)) || [];

            const renamedData = {};
            Object.keys(data).forEach(key => {
                const newKey = fieldMapping[key] || key;
                renamedData[newKey] = data[key];
            });

            verifiedData.push(renamedData);
            localStorage.setItem(verificationKey, JSON.stringify(verifiedData));

            updatedData.splice(index, 1);
        }

        localStorage.setItem('formDataArray', JSON.stringify(updatedData));

        displayData();
    }

    function handleDelete(index) {
        const updatedData = JSON.parse(localStorage.getItem('formDataArray')) || [];
        updatedData.splice(index, 1);
        localStorage.setItem('formDataArray', JSON.stringify(updatedData));
        displayData();
    }

    function filterDataByGenre(genre) {
        const savedData = JSON.parse(localStorage.getItem('formDataArray')) || [];
        
        if (genre === 'all') {
            displayData(savedData);
        } else {
            const targetGenre = fieldMapping[genre] ? fieldMapping[genre].toLowerCase() : null;
            const filteredData = savedData.filter(data => {
                const selectedGenre = data.select1.toLowerCase();
                return selectedGenre.includes(targetGenre);
            });
    
            if (filteredData.length > 0) {
                displayData(filteredData);
            } else {
                dataContainer.innerHTML = 'Нет данных с выбранным жанром';
                setTimeout(() => {
                    displayData(savedData);
                }, 2000);
            }
        }
    }
});
