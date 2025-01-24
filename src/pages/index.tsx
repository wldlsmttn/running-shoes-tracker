import ShoeComparator from '../components/ShoeComparator';

export function getStaticProps() {
  const mockData = [
    {
      id: 1,
      name: "Nike Air Zoom Pegasus 38",
      brand: "Nike",
      price: 120,
      store: "Nike Store",
      storeUrl: "https://nike.com",
      category: "Route",
      usage: "Entraînement quotidien",
      drop: 10,
      stackHeight: { heel: 24, forefoot: 14 },
      weight: 275,
      toeBoxWidth: "Standard",
      midsoleFoam: "React",
      plate: "Non",
      estimatedDurability: 800,
      terrain: "Route/Piste",
      supportType: "Neutre",
      lastUpdate: "2025-01-24"
    }
  ];

  return {
    props: {
      shoes: mockData,
      lastUpdate: new Date().toISOString()
    },
    revalidate: 43200
  };
}

export default function Home({ shoes, lastUpdate }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <ShoeComparator initialData={shoes} lastUpdate={lastUpdate} />
    </div>
  );
}
