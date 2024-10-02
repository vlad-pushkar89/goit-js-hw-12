export function renderImageCards(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <div class="photo-card">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b> <span>${likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b> <span>${views}</span>
            </p>
            <p class="info-item">
              <b>Comments</b> <span>${comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b> <span>${downloads}</span>
            </p>
          </div>
        </div>`;
      }
    )
    .join('');
}

export function clearGallery(galleryEl) {
  galleryEl.innerHTML = '';
}

export function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
