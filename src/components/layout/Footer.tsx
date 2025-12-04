'use client'

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex flex-col w-full text-center text-sm px-4 mt-0 p-7 text-black">
      <p className="text-lg">
        📩 Є питання чи потрібна допомога? Напиши в{" "}
        <Link href="https://instagram.com/vash.finplan" target="_blank"
          className=" text-orange-800 underline">
          Instagram
        </Link>{" "}
        або {" "}
        <Link href="https://t.me/vash_iv" target="_blank" className=" text-orange-800 underline">
          Telegram
        </Link>
      </p>
      <div>
        <p className="mt-4 text-m">Copyright© 2025 @vash.finplan</p>
      </div>
    </footer>
  );
}
