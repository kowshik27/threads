"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname} from "next/navigation";

function BottomSidebar() {
	const pathname = usePathname();

	return (
		<section className="bottombar md:hidden bg-glassmorphism">
			<div className="bottombar_container">
				{sidebarLinks.map((link) => {
					const isActive =
						(pathname.includes(link.route) && link.route.length > 1) ||
						pathname === link.route;
					// console.log(isActive, pathname);
					return (
							<Link
								href={link.route}
								key={link.label}
								className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
							>
								<div className="flex flex-col items-center">
								<Image
									src={link.imgURL}
									alt={link.label}
									width={24}
									height={24}
								/>
								{/* 
										max-lg =>
											Less than lg window size, then display is hidden
									*/}
								<p className="text-subtle-medium text-light-1 max-sm:hidden">
									{link.label.split(" ")[0]}
								</p>
								</div>
							</Link>
				);
				})}
			</div>
		</section>
	);
}

export default BottomSidebar;
