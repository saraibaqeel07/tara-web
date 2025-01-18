import React from 'react';
import { Box } from '@mui/material';

const PageNavigator = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onPageClick,
  backwardArrow,
  forwardArrow,
}) => {

  // Function to generate page numbers dynamically
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show the first page
    pageNumbers.push(1);

    // If the current page is in the middle, show surrounding pages
    if (currentPage > 3) {
      pageNumbers.push('...'); // Show ellipsis before current page
    }

    // Show pages around the current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Show ellipsis if there are skipped pages after the current page
    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }

    // Always show the last page
    if (totalPages > 1) pageNumbers.push(totalPages);

    return pageNumbers;
  };

  return (
    <Box
      sx={{
        width: "60%",
        height: "60%",
        backgroundColor: "#FFFFFF8A",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        margin: "50px auto",
        borderRadius: "8px",
        padding: "5px 0",
        '@media (max-width: 920px)': {
          width: "80%", // Increase width for screens smaller than 920px
          fontSize: "16px", // Smaller font size
        },
        '@media (max-width: 700px)': {
          width: "90%", // Further increase width for smaller screens
        },
        '@media (max-width: 481px)': {
          width: "100%", // Take full width on very small screens
          padding: "3px 0",
        },
      }}
    >
      {/* Left Arrow */}
         <Box
        sx={{
          position: "absolute",
          left: "20px",
          cursor: currentPage > 1 ? "pointer" : "not-allowed",
          opacity: currentPage > 1 ? 1 : 0.5,
          bottom: "10px",
          '@media (max-width: 920px)': {
            width: "45px", // Smaller arrow on smaller screens
            height: "30px", // Smaller arrow on smaller screens
            bottom: "14px",
          },
          '@media (max-width: 700px)': {
            width: "40px", // Even smaller arrow on smaller screens
            height: "28px",
            bottom: "10px",

          },
          '@media (max-width: 481px)': {
            width: "30px", // Further reduce arrow size on very small screens
            height: "15px",
            bottom: "17px",
          },
        }}
        onClick={onPrevPage}
      >
        <Box
          component="img"
          src={backwardArrow}
          alt="Previous"
          sx={{
            width: "55px",
            height: "40px",
            objectFit: "cover",
            '@media (max-width: 920px)': {
              width: "45px", // Smaller arrow on smaller screens
              height: "30px",
            },
            '@media (max-width: 700px)': {
              width: "40px", // Even smaller arrow on smaller screens
              height: "28px",
            },
            '@media (max-width: 481px)': {
              width: "40px", 
              height: "28px",
            },
          }}
        />
      </Box>

      {/* Page Numbers */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {getPageNumbers().map((page, index) => {
          return (
            <Box
              key={index}
              onClick={() => page !== '...' && onPageClick(page)}
              className="heading-font"
              sx={{
                backgroundColor: page === currentPage ? "#CA6680" : "transparent",
                color: "#fff",
                padding: "15px 25px",
                margin: "0 10px",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: page === '...' ? "default" : "pointer",
                borderRadius: "8px",
                '@media (max-width: 920px)': {
                  padding: "10px 20px",
                  fontSize: "16px", // Smaller font size on smaller screens
                },
                '@media (max-width: 700px)': {
                  padding: "8px 18px",
                  fontSize: "14px", // Even smaller font size on smaller screens
                },
                '@media (max-width: 481px)': {
                  padding: "6px 12px",
                  fontSize: "12px", // Further reduce font size on very small screens
                },
              }}
            >
              {page}
            </Box>
          );
        })}
      </Box>

      {/* Right Arrow */}
       <Box
        sx={{
          position: "absolute",
          right: "20px",
          cursor: currentPage < totalPages ? "pointer" : "not-allowed",
          opacity: currentPage < totalPages ? 1 : 0.5,
          bottom: "10px",
          '@media (max-width: 920px)': {
            width: "45px", // Smaller arrow on smaller screens
            height: "30px",
            bottom: "14px",
          },
          '@media (max-width: 700px)': {
            width: "40px", // Even smaller arrow on smaller screens
            height: "28px",
            bottom: "10px",

          },
          '@media (max-width: 481px)': {
            width: "30px", // Further reduce arrow size on very small screens
            height: "15px",
            bottom: "17px",

          },
        }}
        onClick={onNextPage}
      >
        <Box
          component="img"
          src={forwardArrow}
          alt="Next"
          sx={{
            width: "55px",
            height: "40px",
            objectFit: "cover",
            '@media (max-width: 920px)': {
              width: "45px", // Smaller arrow on smaller screens
              height: "30px",
            },
            '@media (max-width: 700px)': {
              width: "40px", // Even smaller arrow on smaller screens
              height: "28px",
            },
            '@media (max-width: 481px)': {
              width: "40px", 
              height: "28px",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PageNavigator;
