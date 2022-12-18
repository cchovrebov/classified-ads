import React from 'react';
import ImageUploading from 'react-images-uploading';
import Button from '@mui/material/Button';
import _ from 'lodash';

const Upload = ({ onImgChange, images = [] }) => {
  const maxNumber = 10;

  const onChange = async (imageList) => {
    onImgChange(imageList);
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <Button
            size="small"
            type="submit"
            variant="contained"
            style={isDragging ? { color: 'red' } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            Click or Drop here
          </Button>
          &nbsp;
          <Button
            size="small"
            type="submit"
            variant="contained"
            onClick={onImageRemoveAll}
            {...dragProps}
          >
            Remove all images
          </Button>
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.data_url} alt="" width="100" />
              <div className="image-item__btn-wrapper">
                <Button
                  size="small"
                  type="submit"
                  variant="contained"
                  onClick={() => onImageUpdate(index)}
                >
                  Update
                </Button>
                &nbsp;
                <Button
                  size="small"
                  type="submit"
                  variant="contained"
                  onClick={() => onImageRemove(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
}

export default Upload;
