'use client';
import React from "react";
import Image from "next/image";

import FooterLogo from '../assets/images/footerLogo.svg';
import redBorderBg from '../assets/images/redBorderBg.svg';
import RedMandir from '../assets/images/RedMandir.svg';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className=" bg-red-extraDark bg-no-repeat pt-16 sm:pt-[93px] pb-10 sm:pb-16 relative">
            <Image src={redBorderBg} width={1920} height={78} alt="Footer Border" className="absolute left-0 bottom-full" />
            <Image src={RedMandir} width={793} height={232} alt="Footer Mandir" className="absolute left-0 bottom-full sm:-top-[193px] lg:-top-[240px] w-[650px] lg:w-[793px]" />
            <div className="container flex flex-col justify-center">
                <Link href={'/'} className="text-center mx-auto inline-block"><Image src={FooterLogo} width={238} height={50} alt="Dharmgyan" className="mx-auto" /></Link>

                <ul className="secondary-menus">
                    <li><Link href="/mandirs">Religious place </Link></li>
                    <li><Link href="/">Festivals</Link></li>
                    <li><Link href="/deity">Gods and goddesses</Link></li>
                    <li><Link href="/aarti">Aarti</Link></li>
                    <li><Link href="/chalisa">Chalia</Link></li>
                    <li><Link href="/bhajan">Bhajan</Link></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
