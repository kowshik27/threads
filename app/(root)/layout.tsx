import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

// Importing Components from root folder can be done using @/
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RigftSidebar";
import BottomSidebar from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Threads",
	description: "NextJS based Threads Application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<Topbar />
					<main className="flex flex-row">
						<LeftSidebar />
						<section className='main-container'>
							<div className="w-full max-w-4xl">{children}</div>
						</section>
						<RightSidebar />
					</main>
					<BottomSidebar />
				</body>
			</html>
		</ClerkProvider>
	);
}
