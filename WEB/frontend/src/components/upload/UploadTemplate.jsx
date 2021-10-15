import React from 'react';
import NavBar from '../common/NavBar';
import DarkTemplate from '../common/DarkTemplate';

const UploadTemplate = ({ children }) => (
  <>
    <DarkTemplate sx={{ padding: 0 }}>
      <NavBar
        title="위드밀리터리"
        bgColor="primary"
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      />
      {children}

    </DarkTemplate>
  </>
);

export default UploadTemplate;
