document.addEventListener('DOMContentLoaded', function () {

  
  const select1 = document.getElementById('select1');

  select1.addEventListener('change', function () {
    const selectedValue = select1.value;
    const formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];
    const lastFormData = formDataArray[formDataArray.length - 1];

    if (lastFormData) {
      lastFormData.select1 = selectedValue;
      localStorage.setItem('formDataArray', JSON.stringify(formDataArray));
    }
  });

  const currentUrl = window.location.pathname

  if (currentUrl !== '/releases.html'){
  const storiesData = [
    { Artist: 'Cupsize',title: 'Дели на два',prod: 'greyrock',select1: 'Мейнстрим',discription: 'крутая песня всем советую', image: '/image/artists/cupsize.jpeg',date:2023,links: 'https://band.link/deli_na_dva' },
    { Artist: '17 Seventeen',title: 'Коммунарка',prod: 'kayyo & 17 seventeen',select1: 'Мейнстрим',discription: 'крутая песня всем советую', image: '/image/artists/17 seventeen.png',date:2023,links: 'https://bfan.link/kommunarka' },
    { Artist: 'Sqwore',title: 'Девочка в окне напротив',prod: 'kayyo & emi4ka',select1: 'Мейнстрим',discription: 'крутая песня всем советую', image: '/image/artists/sqwore.jpg',date:2023,links: 'https://vk.cc/crgDRu' },
    { Artist: 'паранойя',title: 'Silent Hill',prod: 'owleeng & pharm',select1: 'Мейнстрим',discription: 'крутая песня всем советую', image: '/image/artists/paranoya.jpg',date:2023,links: 'https://band.link/Rf61z' },
    { Artist: '9mice',title: 'SPRAY',prod: 'Aarne',select1: 'Мейнстрим',discription: 'крутая песня всем советую', image: '/image/artists/9mice.png',date:2023,links: 'https://vk.com/music/album/-2000180984_19180984_cc92f0d0311d4ef78e'  },
    { Artist: 'lovv66',title: 'iwo3?',prod: 'idkwho',select1: 'Мейнстрим',discription: 'крутая песня всем советую', image: '/image/artists/lovv66.webp',date:2023,links: 'https://band.link/ne_zabyvaj' },
    { Artist: 'NEWLIGHTCHILD',title: 'GESHTALD',prod: 'junglegud',select1: 'Мейнстрим',discription: 'крутая песня всем советую', image: '/image/artists/newlightchild.jpg',date:2023,links: 'https://band.link/geshtaltnewlight' },
    { Artist: 'Скриптонит',title: 'Дотла',prod: 'intovert',select1: 'Мейнстрим',discription: 'крутая песня всем советую', image: '/image/artists/sckriptonit.jpg',date:2023,links: 'https://band.link/dotla_' },
    { Artist: 'Thrill Pill',title: 'Пластик',prod: 'паранойя',select1: 'Мейнстрим',discription: 'крутая песня всем советую', image: '/image/artists/thrillpill.jpg',date:2023,links: 'https://vk.cc/crMF53' },
    { Artist: 'Три Дня Дождя',title: 'Домой заберу',prod: 'undertald',select1: 'Мейнстрим',discription: 'крутая песня всем советую', image: '/image/artists/3dnyadozhdya.jpg',date:2023, links: 'https://band.link/4ylh2' },
   
  ];

  localStorage.setItem('storiesData', JSON.stringify(storiesData));

  const storedStoriesData = localStorage.getItem('storiesData');

    if (storedStoriesData) {
      const storiesData = JSON.parse(storedStoriesData);
      const swiperWrapper = document.querySelector('.swiper-wrapper');
      swiperWrapper.innerHTML = '';
      storiesData.forEach((story, index) => {
        const swiperSlide = document.createElement('div');
        swiperSlide.className = 'swiper-slide swiper-slide-active';
        swiperSlide.style.width = '150px';
        swiperSlide.innerHTML = `
          <div class="story-item story-item-legend">
            <a href="/artist/${story.Artist}.html" class="story-link story-link-image">
              <img src="${story.image}" alt="">
            </a>
            <div class="story-link-title">${story.Artist}</div>
          </div>
        `;
        swiperWrapper.appendChild(swiperSlide);
      });
    }
    const awardsSection = document.querySelector('.home-awards-section .swiper-wrapper');
    const searchInput = document.querySelector('.is-search-input');
    function filterCards() {
      const searchTerm = searchInput.value.toLowerCase();
      const cardTitles = awardsSection.querySelectorAll('.card-title');
      cardTitles.forEach(function (cardTitle) {
        const titleText = cardTitle.textContent.trim().toLowerCase();
        const cardSlide = cardTitle.closest('.swiper-slide');
        if (titleText.includes(searchTerm)) {
          cardSlide.style.display = 'block';
        } else {
          cardSlide.style.display = 'none';
        }
      });
    }
    searchInput.addEventListener('input', filterCards);
    const verifiedDataArray = JSON.parse(localStorage.getItem('verifiedDataArray')) || [];
    function createCard(data) {
      return `
        <div class="swiper-slide swiper-slide-active" style="width: 272px;margin-right: 20px;" role="group" aria-label="1 / 8">
          <div class="swiper-wrapper card-award-small card-artist ">
            <div class="card card-small">
              <div class="card-image">
                <img src="${data.image1}" alt="">
                <div class="card-content">
                  <div class="card-header">
                    <div class="card-header-info">
                      <div class="card-title">${data.input2}</div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="small-card-name">${data.input1}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    verifiedDataArray.forEach(function (data) {
      const cardHtml = createCard(data);
      awardsSection.insertAdjacentHTML('afterbegin', cardHtml);
    });
    filterCards();
  }
});

const openModalBtn = document.getElementById('sbmt-button');
    const modal = document.getElementById('myModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const submitBtn = document.getElementById('submitBtn');
    const forms = document.querySelectorAll('.form');
    const errorContainer = document.getElementById('errorContainer');
    let formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];

    openModalBtn.addEventListener('click', function () {
      modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', function () {
      modal.style.display = 'none';
      removeHighlight();
    });

    window.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
        removeHighlight();
      }
    });

    submitBtn.addEventListener('click', function () {
      removeHighlight();

      let isFormValid = true;
      forms.forEach(function (form) {
        if (!validateForm(form)) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        let promises = [];
        forms.forEach(function (form, formIndex) {
          let formData = {};
          const fileInput = form.querySelector('input[type="file"]');
          const file = fileInput.files[0];

          if (file) {
            promises.push(new Promise(function (resolve, reject) {
              const img = new Image();
              img.src = URL.createObjectURL(file);

              img.onload = function () {
                if (img.width === img.height) {
                  formData['image1'] = '../image/artists/' + file.name;
                  showImagePreview(file, formIndex);
                  hideErrorMessage();
                  resolve();
                } else {
                  displayErrorMessage('Пожалуйста, выберите изображение с квадратным разрешением.');
                  fileInput.value = '';
                  hideImagePreview(formIndex);
                  reject();
                }
              };

              img.onerror = function () {
                reject();
              };
            }));
          } else {
            formData['image1'] = null;
            hideImagePreview(formIndex);
          }

          form.querySelectorAll('textarea, select').forEach(function (input) {
            if (input.tagName.toLowerCase() === 'select') {
              const selectedOption = input.options[input.selectedIndex];
              formData[input.name] = selectedOption.text;

              const formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];
              const lastFormData = formDataArray[formDataArray.length - 1];
              if (lastFormData) {
                lastFormData.select1 = selectedOption.text;
                localStorage.setItem('formDataArray', JSON.stringify(formDataArray));
              }
            } else {
              formData[input.name] = input.value;
            }
          });

          formDataArray.push(formData);

          form.reset();
        });

        Promise.all(promises)
          .then(function () {
            localStorage.setItem('formDataArray', JSON.stringify(formDataArray));
            modal.style.display = 'none';
            showSuccessMessage('Форма успешно отправлена!');
          })
          .catch(function () {

          });
      } else {
        displayErrorMessage('Пожалуйста, заполните все обязательные поля.');
      }
    });

    forms.forEach(function (form, formIndex) {
      const fileInput = form.querySelector('input[type="file"]');
      fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        if (file) {
          const img = new Image();
          img.src = URL.createObjectURL(file);
          img.onload = function () {
            if (img.width === img.height) {
              showImagePreview(file, formIndex);
              hideErrorMessage();
            } else {
              displayErrorMessage('Пожалуйста, выберите изображение с квадратным разрешением.');
              fileInput.value = '';
              hideImagePreview(formIndex);
            }
          };
        }
      });
    });

    forms.forEach(function (form, formIndex) {
      form.querySelectorAll('textarea, input[type="file"], select').forEach(function (input) {
        input.addEventListener('input', function () {
          updateOutput(formIndex);
        });
      });
    });

    function validateForm(form) {
      let isValid = true;

      form.querySelectorAll('textarea, input[type="file"], select').forEach(function (input) {
        if (input.type === 'file') {
          const fileInput = input;
          const file = fileInput.files[0];
          if (!file) {
            isValid = false;
            highlightField(input);
          }
        } else {
          if (!input.value.trim()) {
            isValid = false;
            highlightField(input);
          }
        }
      });

      return isValid;
    }

    function highlightField(input) {
      input.classList.add('highlight');
    }

    function removeHighlight() {
      forms.forEach(function (form) {
        form.querySelectorAll('.highlight').forEach(function (input) {
          input.classList.remove('highlight');
        });
      });
    }

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

forms.forEach(function (form, formIndex) {
  const fileInput = form.querySelector('input[type="file"]');
  fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = function () {
        if (img.width === img.height) {
          showImagePreview(file, formIndex);
          hideErrorMessage();
        } else {
          displayErrorMessage('Пожалуйста, выберите изображение с квадратным разрешением.');
          fileInput.value = '';
          hideImagePreview(formIndex);
        }
      };
    }
  });
});

forms.forEach(function (form, formIndex) {
  form.querySelectorAll('textarea, input[type="file"], select').forEach(function (input) {
    input.addEventListener('input', function () {
      updateOutput(formIndex);
    });
  });
});

function displayErrorMessage(message) {
  errorContainer.textContent = message;
  errorContainer.style.display = 'block';
}

function hideErrorMessage() {
  errorContainer.textContent = '';
  errorContainer.style.display = 'none';
}

function showImagePreview(file, index) {
  const previewImage = document.getElementById(`previewImage${index + 1}`);
  previewImage.src = URL.createObjectURL(file);
  previewImage.style.display = 'block';
}

function hideImagePreview(index) {
  const previewImage = document.getElementById(`previewImage${index + 1}`);
  previewImage.src = '';
  previewImage.style.display = 'none';
}

function updateOutput(index) {
  const formData = formDataArray[index] || {};
  const form = forms[index];

  form.querySelectorAll('textarea, input[type="file"], select').forEach(function (input) {
    if (input.type === 'file') {
      const fileInput = input;
      const file = fileInput.files[0];
      if (file) {
        formData['image1'] = file.name;
        showImagePreview(file, index);
      } else {
        formData['image1'] = null;
        hideImagePreview(index);
      }
    } else if (input.type === 'select-one') {
      const selectedOption = input.options[input.selectedIndex];
      formData[input.name] = selectedOption.text;
      localStorage.setItem('formDataArray', JSON.stringify(formDataArray));
    } else {

      formData[input.name] = input.value;

    }
  });
  
}

