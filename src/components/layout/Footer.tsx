import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full text-center text-sm text-gray-600 px-4 mt-10">
      <p className="text-lg">
        📩 Є питання чи потрібна допомога? Напиши в{" "}
        <Link href="https://instagram.com/vash_ivan" target="_blank"
          className=" text-blue-600 underline">
          Instagram
        </Link>{" "}
        або залиш заявку на сайті.
      </p>
    </footer>
  );
}
