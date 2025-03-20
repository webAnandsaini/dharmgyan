import Image from "next/image";
import Link from "next/link";

const PostCard = ({title, image = null, excerpt, link, index = null}) => {
    return (
        <div key={index || title} className="group overflow-hidden rounded-md custom-shadow">
            <div className="aspect-[480/160] w-full overflow-hidden relative">
                <Image
                    src={image ? image?.node?.mediaItemUrl : 'https://dummyimage.com/480x160/b4b6b7/fff.png'}
                    fill
                    alt={image?.node?.altText || title}
                    className={`object-cover size-full group-hover:scale-105 transition-all duration-1000 ${image ? 'object-[10%_center]' : ''}`}
                />
            </div>
            <div className="px-3 pt-3 pb-4">
                <h2 className="line-clamp-2 text-2xl leading-relaxed">{title}</h2>
                <div>
                    <p className="line-clamp-2 leading-relaxed">{excerpt.replace(/<\/?p>/g, "")}</p>
                    <Link href={link} className="button sm mt-2">
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PostCard;