import { GetStaticProps } from 'next';
import ShoeComparator from '../components/ShoeComparator';

interface Shoe {
  id: string;
  brand: string;
  model: string;
  purchaseDate: string;
  mileage: number;
  totalDistance: number;
  status: string;
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const kv = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${process.env.KV_SHOES_NAMESPACE}/values/shoes_list`, {
      headers: {
        'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`
      }
    });
    
    const shoes: Shoe[] = await kv.json() || [];
    return {
      props: {
        shoes,
        lastUpdate: new Date().toISOString()
      },
      revalidate: 43200
    };
  } catch (error) {
    return {
      props: {
        shoes: [],
        lastUpdate: null
      },
      revalidate: 43200
    };
  }
};

export default function Home({ shoes, lastUpdate }: { shoes: Shoe[], lastUpdate: string | null }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <ShoeComparator initialData={Array.isArray(shoes) ? shoes : []} lastUpdate={lastUpdate} />
    </div>
  );
}
