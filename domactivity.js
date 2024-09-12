document.addEventListener('DOMContentLoaded', function () {
    const paintings = JSON.parse(content); // Your JSON data as a string
    
    const paintingList = document.querySelector('#paintings');
    const figure = document.querySelector('figure');
    const h2 = document.querySelector('#title');
    const h3 = document.querySelector('#artist');
    const descriptionDiv = document.querySelector('#description');
    
    //loop through the data array and generate a list of thumbnail images of the paintings
    paintings.forEach((painting) => {
        const listItem = document.createElement('li');
        
        const img = document.createElement('img');
        img.src = `images/small/${painting.id}.jpg`;
        img.setAttribute('data-id', painting.id);
        img.alt = painting.title;
        img.classList.add('thumbnail');
        
        listItem.appendChild(img);
        paintingList.appendChild(listItem);
    });
    
    //clicking on thumbnails logic 
    paintingList.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {
            const paintingId = e.target.getAttribute('data-id');
            const painting = paintings.find(p => p.id === paintingId);
            
            if (painting) {
                //empty the <figure> element
                figure.innerHTML = '';
                
                //create large image list
                const largeImg = document.createElement('img');
                largeImg.src = `images/large/${painting.id}.jpg`;

                //display a larger version of the painting (inside the supplied <figure> element)
                figure.appendChild(largeImg);
                
                //display its title and artist in the supplied <h2> and <h3> elements
                h2.textContent = painting.title;
                h3.textContent = painting.artist;
                
                //loop through the features array
                painting.features.forEach(feature => {
                    //programmatically construct div element
                    const featureList = document.createElement('div');
                    featureList.classList.add('box');
                    featureList.style.position = 'absolute';
                    featureList.style.left = `${feature.upperLeft[0]}px`;
                    featureList.style.top = `${feature.upperLeft[1]}px`;
                    featureList.style.width = `${feature.lowerRight[0] - feature.upperLeft[0]}px`;
                    featureList.style.height = `${feature.lowerRight[1] - feature.upperLeft[1]}px`;
                    
                    //mouseover sets textContent to description property of the feature data for rectangle
                    featureList.addEventListener('mouseover', function () {
                        descriptionDiv.textContent = feature.description;
                    });
                    
                    //mouseout empties the content of the textContent.
                    featureList.addEventListener('mouseout', function () {
                        descriptionDiv.textContent = '';
                    });
                    
                    figure.appendChild(featureList);
                    figure.style.cursor = 'none';
                });
            }
        }
    });
});