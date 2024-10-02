import { fetchImages } from './js/pixabay-api';
import {
  renderImageCards,
  clearGallery,
  smoothScroll,
} from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let query = '';
let page = 1;
let totalHits = 0;
let galleryEl;
let loadMoreBtn;
let simpleLightbox;

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('#search-form');
  galleryEl = document.querySelector('.gallery');
  loadMoreBtn = document.createElement('button');
  loadMoreBtn.textContent = 'Load more';
  loadMoreBtn.classList.add('load-more-btn');
  loadMoreBtn.style.display = 'none';
  document.body.appendChild(loadMoreBtn);

  searchForm.addEventListener('submit', onSearch);
  loadMoreBtn.addEventListener('click', loadMoreImages);
});

async function onSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Search query cannot be empty',
    });
    return;
  }

  clearGallery(galleryEl);
  page = 1;
  await fetchAndRenderImages();
  toggleLoadMoreBtn();
}

async function loadMoreImages() {
  page += 1;
  await fetchAndRenderImages();
  smoothScroll();
  toggleLoadMoreBtn();
}

async function fetchAndRenderImages() {
  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, no images found!',
      });
      return;
    }

    const markup = renderImageCards(data.hits);
    galleryEl.insertAdjacentHTML('beforeend', markup);

    if (simpleLightbox) {
      simpleLightbox.refresh();
    } else {
      simpleLightbox = new SimpleLightbox('.gallery a');
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  }
}

function toggleLoadMoreBtn() {
  if (galleryEl.children.length < totalHits) {
    loadMoreBtn.style.display = 'block';
  } else {
    loadMoreBtn.style.display = 'none';
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
    });
  }
}
