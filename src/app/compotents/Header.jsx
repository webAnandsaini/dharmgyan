'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname  } from "next/navigation";

import Logo from "../assets/images/wp/DharmGyan.svg";

export default function Header() {

    const pathName = usePathname();

    return (
        <>
            <header className={`primary-header flex justify-between items-center px-4 sm:px-8 md:px-16 ${pathName === '/' ? '' : 'header-backgroud'}`}>
                <div className="site-logo">
                    <Link href="/">
                      <Image src={Logo} width={210} height={0} alt="Dharm Gyan" className="w-[180px] md:w-auto" />
                    </Link>
                </div>
                <div className="header-middle hidden lg:block">
                    <ul className="primary-menus">
                        <li><Link href="/mandirs">Religious place </Link></li>
                        <li><Link href="/">Festivals</Link></li>
                        <li><Link href="/deity">Gods and goddesses</Link></li>
                        <li><Link href="/aarti">Aarti</Link></li>
                        <li><Link href="/chalisa">Chalia</Link></li>
                        <li><Link href="/bhajan">Bhajan</Link></li>
                    </ul>
                </div>
                <div className="header-right">
                    <Link href="#" className="button">login</Link>
                </div>
            </header>


        </>
    )

}