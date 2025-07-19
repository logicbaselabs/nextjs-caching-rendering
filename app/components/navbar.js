import Link from "next/link";

export default function Navbar() {
    return (
        <ul className="flex divide-x divide-zinc-800 border-b border-zinc-800 py-2 mb-10">
            {[
                { title: "Home", link: "/" },
                { title: "Request Memoization", link: "/request-memoization" },
                { title: "Data Cache", link: "/data-cache" },
                { title: "Full Route Cache", link: "/full-route-cache" },
                { title: "Router Cache", link: "/router-cache" },
            ].map((item, index) => (
                <li
                    key={item.title}
                    className={`${index === 0 ? "pl-0" : "pl-4"} pr-4`}
                >
                    <Link prefetch={false} href={item.link}>
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
