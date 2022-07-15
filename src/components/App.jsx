import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImgWithQuery } from 'API/api';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import { Button } from './Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from './Loader/Loader';
import { imgMapper } from 'utils/imgMapper';

import s from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImg, setLargeImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      return;
    }
    async function getImeges() {
      try {
        setIsLoading(true);
        const newImages = await fetchImgWithQuery(query, page);
        setImages(prevImg => [...prevImg, ...imgMapper(newImages)]);
      } catch {
        return toast.error("Sorry, we didn't find anything");
      } finally {
        setIsLoading(false);
      }
    }
    getImeges();
  }, [query, page]);

  const OnChangeQuery = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const handleImgClick = largeImg => {
    setLargeImg(largeImg);
  };

  return (
    <div className={s.app}>
      <SearchBar onSubmit={OnChangeQuery} />
      <ToastContainer autoClose={3000} />

      {isLoading && <Loader />}

      {images.length > 0 && (
        <ImageGallery images={images} onClick={handleImgClick} />
      )}

      {images.length > 0 && !isLoading && <Button onClick={loadMore} />}

      {largeImg && (
        <Modal imgLarge={largeImg} alt={query} onClose={handleImgClick} />
      )}
    </div>
  );
};
