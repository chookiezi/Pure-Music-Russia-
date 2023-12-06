'use strict'
document.addEventListener('DOMContentLoaded', function () {
    const storedStoriesData = localStorage.getItem('storiesData');
    const pathSegments = window.location.pathname.split('/'); 
    const artistFromURL = decodeURIComponent(pathSegments[pathSegments.length - 1].replace('.html', ''));
  
    if (storedStoriesData && artistFromURL) {
      const storiesData = JSON.parse(storedStoriesData);
      const innerContent = document.getElementById('inner-content');
  
      innerContent.innerHTML = ''; 
  
      const filteredData = storiesData.filter((story) => story.Artist === artistFromURL);
  
      filteredData.forEach((story) => {
        const artistLink = document.createElement('a');
        artistLink.href = story.links;
        artistLink.className = 'artist-link'; 
        artistLink.textContent = 'Посетить страницу релиза';

        const prodDiv = document.createElement('div');
        prodDiv.textContent = 'Prod: ' + story.prod; 
        prodDiv.className = 'prod-div';
        

        const singleWorkHeader = document.createElement('div');
        singleWorkHeader.className = 'single-work-header';


  
        const singleWorkThumbWrapper = document.createElement('div');
        singleWorkThumbWrapper.className = 'single-work-thumb-wrapper';
  
        const image = document.createElement('img');
        image.src = story.image;
        image.alt = 'Thumbnail Image'; 
        singleWorkThumbWrapper.appendChild(image);
  
        const singleWorkHeaderInfoWrapper = document.createElement('div');
        singleWorkHeaderInfoWrapper.className = 'single-work-header-info-wrapper';

  
        const singleWorkType = document.createElement('div');
        singleWorkType.className = 'single-work-type';
  
        const singleWorkTitle = document.createElement('div');
        singleWorkTitle.className = 'single-work-title';
        singleWorkTitle.textContent = story.title;
  
        const singleWorkMeta = document.createElement('div');
        singleWorkMeta.className = 'single-work-meta';
  
        const singleWorkArtists = document.createElement('div');
        singleWorkArtists.className = 'single-work-artists';
  
        const artistMetaItem = document.createElement('a');
        artistMetaItem.href = ''; 
        artistMetaItem.className = 'artist-meta-item';
  
        const artistMetaName = document.createElement('span');
        artistMetaName.className = 'artist-meta-name';
        artistMetaName.textContent = story.Artist;
        artistMetaName.appendChild(prodDiv)
        artistMetaItem.appendChild(artistMetaName);
        
        singleWorkArtists.appendChild(artistMetaItem);
        
        singleWorkMeta.appendChild(singleWorkArtists);
        
  
        const singleWorkDate = document.createElement('div');
        singleWorkDate.className = 'single-work-date';
        singleWorkDate.textContent = story.date;

        
  
        singleWorkMeta.appendChild(singleWorkDate);
        
        singleWorkTitle.appendChild(singleWorkMeta);  
        singleWorkType.appendChild(singleWorkTitle);
        
  
        singleWorkHeaderInfoWrapper.appendChild(singleWorkType);
        singleWorkHeaderInfoWrapper.appendChild(singleWorkTitle);
        singleWorkThumbWrapper.appendChild(singleWorkHeaderInfoWrapper);
        singleWorkHeader.appendChild(singleWorkThumbWrapper);
        
        
        singleWorkTitle.appendChild(singleWorkMeta);
        singleWorkTitle.appendChild(artistLink)
        
        
        
        innerContent.appendChild(singleWorkHeader);

      });
    }
  });