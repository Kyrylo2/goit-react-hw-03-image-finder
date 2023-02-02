import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';

const LoadingMoreButton = ({ onClick, buttonState }) => {
  return (
    <LoadingButton
      loading={buttonState}
      loadingPosition="start"
      color="secondary"
      variant="contained"
      onClick={onClick}
      size="medium"
      startIcon={<DownloadingOutlinedIcon />}
      sx={{ margin: '0 auto' }}
    >
      Render more
    </LoadingButton>
  );
};

export default LoadingMoreButton;
