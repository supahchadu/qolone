
import Navbar from "../../components/navbar"
import Footer from "@/components/Footer";
export default function Layout({children}: Readonly<{children: React.ReactNode}>)
{
   return(
       <main className="font-work-sans">
        <Navbar />
            {children}
        <Footer />
    </main>
    );
}