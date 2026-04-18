import React, { useRef } from 'react';

const ImagePreview = ({ images, onImagesChange }) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const remaining = 3 - images.length;
    if (files.length > remaining) {
      alert(`You can only add ${remaining} more image(s). Maximum 3 images allowed.`);
      return;
    }
    onImagesChange([...images, ...files.slice(0, remaining)]);
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    onImagesChange(updated);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
        {images.map((img, idx) => (
          <div key={idx} style={{ position: 'relative', width: '100px', height: '100px' }}>
            <img
              src={URL.createObjectURL(img)}
              alt={`preview-${idx}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '10px',
                border: '1px solid var(--border)',
              }}
            />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
          </div>
        ))}

        {images.length < 3 && (
          <label style={{
            width: '100px',
            height: '100px',
            border: '2px dashed var(--border)',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            fontSize: '12px',
            transition: 'border-color 0.2s',
            gap: '4px',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <span style={{ fontSize: '24px' }}>+</span>
            <span>Add Image</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
        {images.length}/3 images · JPG, JPEG, PNG only · Max 10MB each
      </p>
    </div>
  );
};

export default ImagePreview;
