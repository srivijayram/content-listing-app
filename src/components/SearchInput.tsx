import React, { useContext, useEffect } from 'react';
import { TextField, IconButton } from '@mui/material';
import ContentContext from '../context/ContentContext';
import styled from '@emotion/styled';
import useDebounce from '../hooks/useDebounce';

const SearchContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  margin: '16px',
  position: 'relative',
});

const BackButton = styled(IconButton)({
  marginRight: '8px',
});

const SearchInput: React.FC = () => {
  const { fetchInitialData,items, searchTerm, setSearchTerm, setFilteredItems } = useContext(ContentContext)!;
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => 
        item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [debouncedSearchTerm, items, setFilteredItems]);

  const filterSearch = (hint: string) => {
    setSearchTerm(hint);
    const filtered = items.filter(item => 
      item.title.toLowerCase().includes(hint.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <SearchContainer>
      <BackButton onClick={() => fetchInitialData()}>
        <img 
          src="https://test.create.diagnal.com/images/Back.png" 
          alt="Back"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
            e.currentTarget.onerror = null; 
            e.currentTarget.src = '../assets/images/Back.png'; 
          }}
          style={{ width: 24, height: 24 }} 
        />
      </BackButton>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ input: { color: '#FFFFFF' } }}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => filterSearch(searchTerm)}>
              <img 
                src="https://test.create.diagnal.com/images/search.png" 
                alt="Search"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
                  e.currentTarget.onerror = null; 
                  e.currentTarget.src = '../assets/images/search.png'; 
                }}
                style={{ width: 24, height: 24 }} 
              />
            </IconButton>
          ),
        }}
      />
    </SearchContainer>
  );
};

export default SearchInput;
