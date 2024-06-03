import { useContext, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { styled } from '@mui/system';
import ContentContext from '../context/ContentContext';


const GridContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '16px',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
});

const GridItem = styled('div')({
  flex: '1 0 calc(33.33% - 16px)', 
  maxWidth: 'calc(33.33% - 16px)',
  marginBottom: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});


const Thumbnail = styled('img')({
  width: '100%',
  aspectRatio: '2 / 3',
  objectFit: 'cover',
  borderRadius: '8px',
});

const Title = styled('h3')({
  textAlign: 'center',
  marginTop: '8px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100%',
});

const ContentGrid = () => {
  const { filteredItems, fetchMoreData } = useContext(ContentContext)!;
  const [hasMore, setHasMore] = useState(true);

  const handleFetchMore = async () => {
    const newData = await fetchMoreData(filteredItems.length / 20 + 1);
    if (newData.length === 0) {
      setHasMore(false);
    }
  };

  return (
    <InfiniteScroll
      dataLength={filteredItems.length}
      next={handleFetchMore}
      hasMore={hasMore}
      loader={<h4 className="text-center mt-4">Loading...</h4>}
      style={{ overflow: 'hidden', width: '100%' }}
    >
      <GridContainer>
        {filteredItems.map(item => (
          <GridItem key={item.id}>
            <Thumbnail src={item.img} alt={item.title}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
                  e.currentTarget.onerror = null; 
                  e.currentTarget.src = ''; 
                }}             
            />
            <Title>{item.title}</Title>
          </GridItem>
        ))}
      </GridContainer>
    </InfiniteScroll>
  );
};

export default ContentGrid;
