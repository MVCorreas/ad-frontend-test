import Catalog from '@/components/Catalog';
import Header from '@/components/Header';

interface SearchParams {
  genre?: string;
  page?: string;
}

export default async function Home({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const genre = searchParams.genre;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Catalog genre={genre} page={page} />
      </main>
    </>
  );
}
