// components/GalleryView.tsx

import React, { useState, useMemo, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  image: string;
  description: string; // Keep description for grid view
  link: string;
  category: string;
}

interface GalleryViewProps {
  projects: Project[];
}

// Define items per page for pagination
const ITEMS_PER_PAGE = 9;

export default function GalleryView({ projects }: GalleryViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [carouselIndex, setCarouselIndex] = useState(0);

  const categories = useMemo(() => ['All', ...new Set(projects.map(p => p.category))].sort(), [projects]);

  // Filter projects based on search and category
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || project.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, filterCategory]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  // Get projects for the current page
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const gridElement = document.getElementById('project-grid-showcase');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const carouselProjects = useMemo(() => projects.slice(0, 3), [projects]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % carouselProjects.length); // Loops back to the first project
    }, 5000); // 5 seconds per slide
    return () => clearInterval(interval); // Cleanup on unmount
  }, [carouselProjects.length]);

  const handlePrev = () => {
    setCarouselIndex(prev => (prev - 1 + carouselProjects.length) % carouselProjects.length);
  };
  const handleNext = () => {
    setCarouselIndex(prev => (prev + 1) % carouselProjects.length);
  };

  
  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar py-24 px-8 ">
      {/* Search and Filter Section - Top */}


      {/* Big Carousel Section - Middle (1 project at a time, image + title) */}
      <div className="mb-16 mx-auto">
        <div className="bg-amber-950 p-8 shadow-pixel-main">
          <h2 className="pixel-text text-3xl mb-8 text-color-4 text-center uppercase">FEATURED SHOWCASE</h2>
          <div className="relative w-full overflow-hidden">
            {/* Carousel Content */}
            {carouselProjects.length > 0 && (
              <>
                <a href={carouselProjects[carouselIndex].link} target="_blank" rel="noopener noreferrer" className="block w-full relative">
                  <img
                    src={carouselProjects[carouselIndex].image}
                    alt={carouselProjects[carouselIndex].title}
                    className="w-full h-[500px] object-cover pixelated-image art-frame-lg"
                  />
                  <div className="absolute bottom-0 left-0 bg-color-1/70 p-4">
                    <h3 className="pixel-text text-xl text-color-4 uppercase">{carouselProjects[carouselIndex].title}</h3>
                  </div>
                </a>
                {/* Indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {carouselProjects.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index === carouselIndex ? 'bg-color-4' : 'bg-color-3'
                      }`}
                    />
                  ))}
                </div>
                {/* Chevron Navigation */}
                <button
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-color-4 p-2 hover:bg-color-1"
                  onClick={handlePrev}
                >
                  ❮
                </button>
                <button
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-color-4 p-2 hover:bg-color-1"
                  onClick={handleNext}
                >
                  ❯
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Project Grid Showcase Section - Bottom */}
      <div id="project-grid-showcase" className="mx-auto pb-10">
        <div className="bg-amber-950 p-8 shadow-pixel-main">
        <input
            type="text"
            placeholder="SEARCH PROJECTS..."
            className="w-full p-4 border-4 border-color-4 pixel-text mb-6 text-amber-200/20 text-center uppercase bg-color-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                className={`pixel-text px-8 py-4 border-4 border-color-4 uppercase ${filterCategory === category ? 'bg-color-4 text-color-1' : 'bg-color-3 text-amber-200'} hover:bg-color-1 hover:text-color-4 transition-colors duration-200`}
                onClick={() => {
                  setFilterCategory(category);
                  setCurrentPage(1);
                }}
              >
                {category}
              </button>
            ))}
          </div>
          <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProjects.map(project => (
              <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer" className="block relative group">
                <img src={project.image} alt={project.title} className="w-full h-64 object-cover pixelated-image art-frame-sm" />
                <div className="absolute inset-0 flex items-end p-4 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-color-4">
                    <h3 className="pixel-text text-lg mb-1 uppercase">{project.title}</h3>
                    <p className="text-sm">{project.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-4">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`pixel-text px-8 py-4 border-4 border-color-4 uppercase ${currentPage === index + 1 ? 'bg-color-4 text-color-4' : 'bg-color-3 text-color-4'} hover:bg-color-1 hover:text-color-4 transition-colors duration-200`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        /* --- STRICT COLOR PALETTE --- */
        /* Provided colors: #4D2D1F, #733E17, #91521A, #B57937 */
        .color-1 { background-color: #4D2D1F; } /* Darkest Brown - For text on light, deepest shadows, button hover background */
        .color-2 { background-color: #733E17; } /* Medium Dark Brown - For background of main containers */
        .color-3 { background-color: #91521A; } /* Medium Brown/Gold - For button backgrounds, input backgrounds */
        .color-4 { background-color: #B57937; } /* Lightest Gold/Brown - For borders, active states, text on dark */

        .bg-color-1 { background-color: #4D2D1F; }
        .bg-color-2 { background-color: #733E17; }
        .bg-color-3 { background-color: #91521A; }
        .bg-color-4 { background-color: #B57937; }

        .text-color-1 { color: #4D2D1F; }
        .text-color-2 { color: #733E17; }
        .text-color-3 { color: #91521A; }
        .text-color-4 { color: #B57937; }

        .border-color-1 { border-color: #4D2D1F; }
        .border-color-2 { border-color: #733E17; }
        .border-color-3 { border-color: #91521A; }
        .border-color-4 { border-color: #B57937; }

        /* Custom box-shadow classes for main containers, very visible */
        .shadow-pixel-main {
          box-shadow:
            inset 0 0 0 6px #B57937,   /* Inner highlight/border (color 4) */
            0 0 0 12px #91521A,    /* Main border (color 3) */
            18px 18px 0 0 #733E17; /* Deep pixel drop shadow (color 2) */
        }

        /* Re-designed Frame Style for Project Images with strict colors */
        .art-frame-lg { /* For the large carousel image */
          border: 4px solid #4D2D1F; /* Innermost dark (color 1) */
          box-shadow:
            0 0 0 4px #4D2D1F,      /* Color 1 border */
            0 0 0 8px #B57937,      /* Color 4 border */
            0 0 0 12px #91521A,     /* Color 3 border */
            0 0 0 16px #733E17,     /* Color 2 border */
            20px 20px 0 0 #4D2D1F;  /* Color 1 drop shadow */
          image-rendering: pixelated;
        }

        .art-frame-sm { /* For the smaller grid images */
          border: 2px solid #4D2D1F; /* Innermost dark (color 1) */
          box-shadow:
            0 0 0 2px #4D2D1F,      /* Color 1 border */
            0 0 0 4px #B57937,      /* Color 4 border */
            0 0 0 6px #91521A,      /* Color 3 border */
            0 0 0 8px #733E17,      /* Color 2 border */
            10px 10px 0 0 #4D2D1F;  /* Color 1 drop shadow */
          image-rendering: pixelated;
        }


        .pixel-text {
          font-family: "Press Start 2P", cursive;
          letter-spacing: 1px;
          text-shadow: none; /* No text-shadow */
        }

        .pixelated-image {
          image-rendering: crisp-edges;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: -moz-crisp-edges;
          image-rendering: pixelated;
        }

        /* Scrollbar styles with strict colors */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4D2D1F #B57937; /* Darkest thumb, lightest track */
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #B57937;
          border: 2px solid #91521A;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4D2D1F;
          border: 2px solid #B57937;
        }
      `}</style>
    </div>
  );
}