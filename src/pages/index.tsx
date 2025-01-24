import ShoeComparator from '../components/ShoeComparator';

export async function getStaticProps() {
  try {
    const kv = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${process.env.KV_SHOES_NAMESPACE}/values/shoes`, {
      headers: {
        'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`
      }
    });
    
    const shoes = await kv.json() || [];

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
}

export default function Home({ shoes, lastUpdate }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <ShoeComparator initialData={shoes} lastUpdate={lastUpdate} />
    </div>
  );
}
