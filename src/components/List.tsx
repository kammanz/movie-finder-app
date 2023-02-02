import React, { useState, useEffect } from 'react';
import { ThrillersUrl } from '../api';
import styles from './List.module.css';
import { sortByProperty, newReleases } from '../utils/utils';
import { imgUrl } from '../api';

export type Movie = {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
};

const List = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [displayData, setDisplayData] = useState<Movie[]>([]);
  const [noResults, setnoResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(ThrillersUrl);
      const { results } = await response.json();
      setData(results);
      setDisplayData(results);
    };

    fetchData();
  }, []);

  const renderList = () => {
    if (displayData) {
      const list = displayData.map((item: Movie) => {
        const { id, poster_path, release_date, title } = item;
        return (
          <li key={id} className={styles.card}>
            <img src={imgUrl(poster_path)} alt="movie poster" />
            <h6>{title}</h6>
            <p>Released: {release_date}</p>
          </li>
        );
      });

      return <ul className={styles.container}>{list}</ul>;
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setnoResults(false);
    switch (e.target.value) {
      case 'newest':
        const sortedByNew = sortByProperty(data, 'release_date', true);
        setDisplayData(sortedByNew);
        break;
      case 'oldest':
        const sortedByOld = sortByProperty(data, 'release_date', false);
        setDisplayData(sortedByOld);
        break;
      case '1':
        const releasedWithinAMonth = newReleases(data, 1);
        const releasedWithinAMonthSorted = sortByProperty(
          releasedWithinAMonth,
          'release_date',
          true
        );
        if (releasedWithinAMonthSorted.length < 1) {
          setnoResults(true);
        }
        setDisplayData(releasedWithinAMonthSorted);
        return;
      case '90':
        const releasedWithinThreeMonths = newReleases(data, 90);
        const releasedWithinThreeMonthsSorted = sortByProperty(
          releasedWithinThreeMonths,
          'release_date',
          true
        );
        if (releasedWithinThreeMonthsSorted.length < 1) {
          setnoResults(true);
        }
        setDisplayData(releasedWithinThreeMonthsSorted);
        return;
      default:
        throw new Error('invalid select value');
    }
  };

  return (
    <div>
      <h1>List Page</h1>
      <section>
        <h4>Sort By:</h4>
        <form>
          <select onChange={handleSelectChange} data-testid="select">
            <option
              value="nothing"
              defaultValue={''}
              data-testid="select-option"></option>
            <option value="newest" data-testid="select-option">
              Newest
            </option>
            <option value="oldest" data-testid="select-option">
              Oldest
            </option>
            <option value={'1'} data-testid="select-option">
              Released Last Month
            </option>
            <option value={'90'} data-testid="select-option">
              Released in Last 3 Months
            </option>
          </select>
        </form>
      </section>
      <main>{data.length > 0 ? renderList() : null}</main>
      {noResults ? <div>Search returned no results</div> : null}
    </div>
  );
};

export default List;
