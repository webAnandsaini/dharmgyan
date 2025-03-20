'use client';
import React from 'react';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from 'lucide-react';

const PageHeader = ({title})=> {
    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)

    return (
        <div className="bg-red-extraDark py-6">
            <div className="container flex justify-between items-center">
                <h1 className="text-size-30 text-white capitalize font-normal">{title}</h1>
                <div>
                    <ul className="flex items-center">
                        <li className="flex items-center gap-0.5 text-white"><Link href={'/'}>{'Home'}</Link>
                        {pathNames.length > 0 && <ChevronRight />}
                        </li>

                        {pathNames.map((link, index) => {
                            let href = `/${pathNames.slice(0, index + 1).join('/')}`;
                            let itemLink = link[0].toUpperCase() + link.slice(1);
                            let isLastItem = index === pathNames.length -1;
                            let separator = <ChevronRight />;

                            return (
                                    <li className="flex items-center gap-0.5 text-white" key={index}>
                                        {!isLastItem ? <Link href={href}>{itemLink}</Link> : itemLink.toLowerCase()}
                                        {!isLastItem && separator}
                                    </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PageHeader