import ShoeComparator from '../components/ShoeComparator';

export async function getStaticProps() {
  try {
    const { SHOES_DATA } = process.env;
    const shoes = await SHOES_DATA.get('shoes', { type: 'json' }) || [];
    const lastUpdate = await SHOES_DATA.get('last_update');

    return {
      props: {
        shoes,
        lastUpdate,
      },
      revalidate: 43200,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        shoes: [],
        lastUpdate: null,
      },
      revalidate: 43200,
    };
  }
}

export default function Home({ shoes, lastUpdate }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <ShoeComparator initialData={shoes} lastUpdate={lastUpdate} />
      <div className="text-sm text-gray-500 mt-4">
        Dernière mise à jour : {new Date(lastUpdate).toLocaleString('fr-FR')}
      </div>
    </div>
  );
}
