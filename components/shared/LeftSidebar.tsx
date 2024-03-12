"use client"; // For using the useRouter

// @ is the placeholder for root
import { sidebarLinks } from "@/constants";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function LeftSidebar() {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<section className="custom-scrollbar leftsidebar">
			<div className="flex w-full flex-1 flex-col gap-4 px-6">
				{/* Why I should use round brackets here??
            Need of key --> To identify different Links in DOM
          */}
				{sidebarLinks.map((link) => {
					const isActive =
						(pathname.includes(link.route) && link.route.length > 1) ||
						pathname === link.route;
					return (
						<Link
							href={link.route}
							key={link.label}
							className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
						>
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
							<p className="max-lg:hidden text-light-1">{link.label}</p>
						</Link>
					);
				})}
			</div>

			<div className="mt-10 px-6">
				<SignedIn>
					<SignOutButton signOutCallback={() => router.push("/")}>
						<div className="flex cursor-pointer gap-4 p-4">
							<Image
								src="/assets/logout.svg"
								alt="logout"
								width={24}
								height={24}
							/>
							<p className="text-light-2 max-lg:hidden">Logout</p>
						</div>
					</SignOutButton>
				</SignedIn>
			</div>
		</section>
	);
}

export default LeftSidebar;
