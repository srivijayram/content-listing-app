import React from 'react';
import { ContentProvider } from '../context/ContentContext';
import SearchInput from '../components/SearchInput';
import ContentGrid from '../components/ContentGrid';
import styled from '@emotion/styled';

const PageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
});

const SearchBarContainer = styled('div')({
  position: 'sticky',
  top: 0,
  width: '100%',
  zIndex: 1000,
  background: 'url(https://test.create.diagnal.com/images/nav_bar.png) no-repeat center/cover',
  paddingBottom: 20,
});

const ContentListingPage: React.FC = () => {
  return (
    <ContentProvider>
      <PageContainer>
        <SearchBarContainer>
          <SearchInput />
        </SearchBarContainer>
        <ContentGrid />
      </PageContainer>
    </ContentProvider>
  );
};

export default ContentListingPage;
