import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import DetailsCard from '../components/DetailsCard';
import type { Character } from '../types';

const DetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        setData(null);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/character/${id}`
        );
        const data = await response.json();

        if (!data.error) {
          setData(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return <DetailsCard data={data} loading={loading} />;
};

export default DetailsPage;
