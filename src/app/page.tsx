import Catalog from "@/components/Catalog";
import Footer from "@/components/Footer";

interface SearchParams {
  genre?: string;
  page?: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const genre = searchParams.genre;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <>
      <Catalog genre={genre} page={page} />
      <Footer />
    </>
  );
}
