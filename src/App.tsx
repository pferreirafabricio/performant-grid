import { useEffect, useState } from 'react';
import { DataTable } from './components/DataTable';
import type { DataRecord } from './types/DataRecord';

const API_URL = 'https://randomuser.me/api/?results=1000&nat=us';

type ApiUser = {
  name: { first: string; last: string };
  registered: { age: number; date: string };
  email: string;
  location: { city: string; state: string; country: string };
};

function transformApiData(apiData: ApiUser[]): DataRecord[] {
  return apiData.map((user) => ({
    name: `${user.name.first} ${user.name.last}`,
    status: user.registered.age > 5 ? 'active' : 'inactive',
    createdAt: user.registered.date,
    email: user.email,
    location: `${user.location.city}, ${user.location.state}, ${user.location.country}`,
  }));
}

const App: React.FC = () => {
  const [data, setData] = useState<DataRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        setData(transformApiData(json.results));
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Performant Grid Demo</h1>
      {loading ? (
        <div>Loading 1000+ records...</div>
      ) : (
        <DataTable data={data} />
      )}
    </div>
  );
};

export default App;
