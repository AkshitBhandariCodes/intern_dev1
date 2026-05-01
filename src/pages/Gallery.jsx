import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';

import PresidentPhoto from '../assets/Dr Sonal Sharma, President.jpg';
import SecretaryPhoto from '../assets/Dr-Prasenjit-Das,-Secrertary-General.jpg';
import VicePresidentPhoto from '../assets/Dr-Anjali-Amarapurkar,-Vice-President.jpg';
import TreasurerPhoto from '../assets/Dr-Arvind-Ahuja,-Treasurer.jpg';
import JointTreasurerPhoto from '../assets/Dr-Lipika-Lipi,-Joint-Treasurer.jpg';

const STORAGE_KEY = 'dc_iapm_gallery_uploads';

const defaultImages = [
  {
    id: 'leadership-1',
    title: 'President Portrait',
    category: 'Office Bearers',
    src: PresidentPhoto,
  },
  {
    id: 'leadership-2',
    title: 'Secretary Portrait',
    category: 'Office Bearers',
    src: SecretaryPhoto,
  },
  {
    id: 'leadership-3',
    title: 'Vice President Portrait',
    category: 'Office Bearers',
    src: VicePresidentPhoto,
  },
  {
    id: 'committee-1',
    title: 'Treasurer Profile',
    category: 'Office Bearers',
    src: TreasurerPhoto,
  },
  {
    id: 'committee-2',
    title: 'Joint Treasurer Profile',
    category: 'Office Bearers',
    src: JointTreasurerPhoto,
  },
];

const uploadCategories = ['Office Bearers'];

const Gallery = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Academic Events');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setUploadedImages(parsed.filter((item) => item?.category === 'Office Bearers'));
      }
    } catch {
      setUploadedImages([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(uploadedImages));
  }, [uploadedImages]);

  const allImages = useMemo(() => [...defaultImages, ...uploadedImages], [uploadedImages]);

  const categories = useMemo(() => {
    const unique = new Set(allImages.map((img) => img.category));
    return ['All', ...unique];
  }, [allImages]);

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') {
      return allImages;
    }

    return allImages.filter((img) => img.category === selectedCategory);
  }, [allImages, selectedCategory]);

  const isLightboxOpen = lightboxIndex >= 0;

  const handleUpload = (event) => {
    event.preventDefault();
    setUploadError('');

    if (!uploadTitle.trim() || !uploadFile) {
      setUploadError('Please add a title and select an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImages((prev) => [
        {
          id: `upload-${Date.now()}`,
          title: uploadTitle.trim(),
          category: uploadCategory,
          src: reader.result,
        },
        ...prev,
      ]);

      setUploadTitle('');
      setUploadCategory('Academic Events');
      setUploadFile(null);
      event.target.reset();
    };

    reader.onerror = () => {
      setUploadError('Unable to read the selected file. Please try another image.');
    };

    reader.readAsDataURL(uploadFile);
  };

  const closeLightbox = () => setLightboxIndex(-1);

  const goPrev = () => {
    setLightboxIndex((prev) => (prev <= 0 ? filteredImages.length - 1 : prev - 1));
  };

  const goNext = () => {
    setLightboxIndex((prev) => (prev >= filteredImages.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
      if (event.key === 'ArrowLeft') {
        goPrev();
      }
      if (event.key === 'ArrowRight') {
        goNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isLightboxOpen, filteredImages.length]);

  return (
    <motion.main
      className="container mx-auto px-4 lg:px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <SEO
        title="Gallery"
        description="Browse categorized photo albums, preview images in a lightbox, and upload gallery items from the admin panel."
        keywords="IAPM gallery, pathology photo albums, event gallery, DC-IAPM images"
      />

      <section className="mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary dark:text-white">Image Gallery</h1>
        <p className="mt-3 text-base md:text-lg text-text-muted-light dark:text-text-muted-dark max-w-3xl">
          Explore categorized albums from our chapter activities, office bearers, and resources. Click any image for a lightbox preview.
        </p>
      </section>

      <section className="mb-10 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-background-dark p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-gold-DEFAULT">admin_panel_settings</span>
          <h2 className="text-2xl font-bold text-primary dark:text-white">Admin Upload Panel</h2>
        </div>

        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            value={uploadTitle}
            onChange={(event) => setUploadTitle(event.target.value)}
            placeholder="Image title"
            className="md:col-span-2 border border-border-light dark:border-border-dark rounded-lg px-4 py-2 bg-white dark:bg-background-dark text-primary dark:text-white"
          />

          <select
            value={uploadCategory}
            onChange={(event) => setUploadCategory(event.target.value)}
            className="border border-border-light dark:border-border-dark rounded-lg px-4 py-2 bg-white dark:bg-background-dark text-primary dark:text-white"
          >
            {uploadCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(event) => setUploadFile(event.target.files?.[0] || null)}
            className="border border-border-light dark:border-border-dark rounded-lg px-2 py-2 bg-white dark:bg-background-dark text-primary dark:text-white"
          />

          <button
            type="submit"
            className="md:col-span-4 justify-self-start bg-gold-DEFAULT hover:bg-gold-light text-primary font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Upload To Gallery
          </button>
        </form>

        {uploadError && <p className="text-red-600 mt-3 text-sm">{uploadError}</p>}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Categorized Albums</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setLightboxIndex(-1);
                }}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  isActive
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white dark:bg-background-dark text-primary dark:text-white border-border-light dark:border-border-dark hover:border-gold-DEFAULT'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <motion.button
              key={image.id}
              type="button"
              whileHover={{ y: -4 }}
              className="text-left rounded-xl overflow-hidden bg-white dark:bg-background-dark border border-border-light dark:border-border-dark shadow-sm"
              onClick={() => setLightboxIndex(index)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={image.src} alt={image.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="font-semibold text-primary dark:text-white truncate">{image.title}</p>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{image.category}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="mt-8 rounded-xl border border-dashed border-border-light dark:border-border-dark p-10 text-center">
            <p className="text-text-muted-light dark:text-text-muted-dark">No images available in this category yet.</p>
          </div>
        )}
      </section>

      <AnimatePresence>
        {isLightboxOpen && filteredImages[lightboxIndex] && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/90 p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute top-4 right-4 text-white"
              onClick={closeLightbox}
              aria-label="Close preview"
            >
              <span className="material-symbols-outlined text-4xl">close</span>
            </button>

            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white"
              onClick={goPrev}
              aria-label="Previous image"
            >
              <span className="material-symbols-outlined text-4xl">chevron_left</span>
            </button>

            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white"
              onClick={goNext}
              aria-label="Next image"
            >
              <span className="material-symbols-outlined text-4xl">chevron_right</span>
            </button>

            <div className="h-full flex flex-col items-center justify-center gap-4">
              <img
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].title}
                className="max-h-[75vh] max-w-[95vw] object-contain rounded-lg"
              />
              <div className="text-center text-white">
                <p className="font-semibold">{filteredImages[lightboxIndex].title}</p>
                <p className="text-sm text-gray-300">{filteredImages[lightboxIndex].category}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default Gallery;