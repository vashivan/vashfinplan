'use client'

import Link from "next/link"

const NavItems = [
  { path: "/homepage", label: "Головна" },
  // { path: "/blog", label: "Блог" },
  { path: "/form", label: "Твій фінплан" }
]

const Navbar = () => {
  return (
    <nav className="p-7 absolute top-0">
      <div className="flex">
        <ol className="items-end gap-7 hidden md:flex">
          {NavItems.map(({ path, label }) => {
            return (
              <li
                key={path}
                className="text-2xl"
              >
                <Link href={path}>{label}</Link>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  )
}

export default Navbar;