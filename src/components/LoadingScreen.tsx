import Image from "next/image";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
      <Image
        src="/loading-pacman.gif"
        alt="Loading..."
        width={500}
        height={500}
        unoptimized
      />
      <span className="text-colour-primary text-lg font-semibold mt-4">
        Loading GamerShop...
      </span>
    </div>
  );
}
