import React, { useState, useEffect } from 'react';

const List = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://api.themoviedb.org/3/search/movie?api_key=fc28873a448c0edccf9ab243ad3ae982&language=en-US&page=1&include_adult=false&query=conan'
      );

      const { results } = await response.json();

      setData(results);
      console.log('data: ', results);
    };

    fetchData();
    return;
  }, []);

  const renderList = () => {
    if (data) {
      const list = data.map((item: any) => {
        return <div key={item.id}>{item.title}</div>;
      });

      return list;
    }
  };

  return <div>{data ? renderList() : 'fetching'}</div>;
};

export default List;
