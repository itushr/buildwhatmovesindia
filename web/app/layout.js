import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomScrollbar from "../components/CustomScrollbar";
import { AppProvider } from "../context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RTI Information Access Portal | Government of India Initiative",
  description:
    "Official Right to Information (RTI) Access Portal. Search public records, file RTI applications, and track requests online seamlessly under the RTI Act, 2005.",
  keywords: [
    "RTI",
    "Right to Information",
    "Government of India",
    "RTI Portal",
    "Public Authority",
    "Citizen Services",
  ],
  authors: [{ name: "Government of India" }],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-gray-900 bg-[#f8fafc]">
        <AppProvider>
          <CustomScrollbar />
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
