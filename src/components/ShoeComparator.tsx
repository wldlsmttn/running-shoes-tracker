import { Shoe } from '../types';

interface Shoe {
  id: string;
  brand: string; 
  model: string;
  purchaseDate: string;
  mileage: number;
  totalDistance: number;
  status: string;
}

interface ShoeComparatorProps {
  initialData: Shoe[];
  lastUpdate: string | null;
}

const ShoeComparator = ({ initialData, lastUpdate }: ShoeComparatorProps) => {
  // ...
};


interface ShoeComparatorProps {
  initialData: Shoe[];
  lastUpdate: string | null;
}

const ShoeComparator = ({ initialData, lastUpdate }: ShoeComparatorProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shoe Comparator</h1>
      {lastUpdate && <p className="text-gray-500 mb-4">Last updated: {lastUpdate}</p>}
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Brand</th>
            <th className="p-2 text-left">Model</th>
            <th className="p-2 text-left">Purchase Date</th>
            <th className="p-2 text-left">Mileage</th>
            <th className="p-2 text-left">Total Distance</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {initialData.map((shoe) => (
            <tr key={shoe.id} className="border-b">
              <td className="p-2">{shoe.brand}</td>
              <td className="p-2">{shoe.model}</td>
              <td className="p-2">{shoe.purchaseDate}</td>
              <td className="p-2">{shoe.mileage}</td>
              <td className="p-2">{shoe.totalDistance}</td>
              <td className="p-2">{shoe.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShoeComparator;
