import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

type Item = {
  id: number;
  title: string;
  img: string;
};

type FetchDataFunction = (pageNumber?: number) => Promise<Item[]>;

type ContentContextProps = {
  items: Item[];
  filteredItems: Item[];
  searchTerm: string;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setFilteredItems: React.Dispatch<React.SetStateAction<Item[]>>;
  fetchMoreData: FetchDataFunction;
  fetchInitialData: FetchDataFunction;
};

type ContentData = {
  page: {
    title: string;
    total_content_items: string;
    page_num_requested: string;
    page_size_requested: string;
    page_size_returned: string;
    'content-items': {
      content: {
        name: string;
        'poster-image': string;
      }[];
    };
  };
};

const ContentContext = createContext<ContentContextProps | undefined>(undefined);

export const ContentProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchData: FetchDataFunction = async (pageNumber = 1) => {
    try {
      const response = await axios.get<ContentData>(`https://test.create.diagnal.com/data/page${pageNumber}.json`);
      const data = response?.data?.page['content-items']?.content;

      if (!data || data.length === 0) {
        return [];
      }

      const contentItems: Item[] = data.map((item, index) => ({
        id: index,
        title: item.name,
        img: `https://test.create.diagnal.com/images/${item['poster-image']}`,
      }));

      return contentItems;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const fetchInitialData: FetchDataFunction = async () => {
    setPage(1);
    setItems([]);
    const initialData = await fetchData(1);
    setItems(initialData);
    setFilteredItems(initialData);
    return initialData;
  };

  const fetchMoreData: FetchDataFunction = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const newData = await fetchData(nextPage);
    setItems(prevItems => [...prevItems, ...newData]);
    setFilteredItems(prevItems => [...prevItems, ...newData]);
    return newData;
  };

  return (
    <ContentContext.Provider value={{ items, filteredItems, searchTerm, setItems, setSearchTerm, setFilteredItems, fetchMoreData, fetchInitialData }}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContext;
