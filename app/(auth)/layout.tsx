import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";

export const metadata = {
	title: "Threads",
	description: "NextJS based Threads Application",
};

// For getting the google font named Inter with latin style
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${inter.className} bg-dark-1`}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
