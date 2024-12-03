import React from 'react';
import { Box } from '@mui/material';

const PageNavigator  = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onPageClick,
  backwardArrow,
  forwardArrow,
}) => {
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
        }}
        onClick={onPrevPage}
      >
        <img
          src={backwardArrow}
          alt="Previous"
          style={{
            width: "55px",
            height: "40px",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Page Numbers */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          return (
            <Box
              key={page}
              onClick={() => onPageClick(page)}
              className="heading-font"
              sx={{
                backgroundColor: page === currentPage ? "#CA6680" : "transparent",
                color: "#fff",
                padding: "15px 25px",
                margin: "0 10px",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "8px",
                '@media (max-width: 768px)': {
                  padding: "10px 20px",
                  fontSize: "18px",
                },
                '@media (max-width: 480px)': {
                  padding: "8px 15px",
                  fontSize: "16px",
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
        }}
        onClick={onNextPage}
      >
        <img
          src={forwardArrow}
          alt="Next"
          style={{
            width: "55px",
            height: "40px",
            objectFit: "cover",
          }}
        />
      </Box>
    </Box>
  );
};

export default PageNavigator ;
