import prismadb from "@/lib/prismadb";
import { CompanionForm } from "./components/companion-form";

interface CompanionIdPageProps {
    params: {
        companionid: string;
    }
}

const CompanionIdPage = async ({params}:CompanionIdPageProps) => {
    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.companionid
        }
    })
    
    const categories = await prismadb.category.findMany();

    return ( 
       <div>
         <CompanionForm
           initialData={companion}
           categories={categories}/>
       </div> );
}
 
export default CompanionIdPage;