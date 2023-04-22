'use client'

import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import CarsEdit from "./CarsEdit";
import MobileEdit from "./MobileEdit";
import RealEstateEdit from "./RealEstateEdit";


const EditPage = ({ params }) => {
  const id = params.editId
  const [details] = useDocumentData(doc(db, "products", id))

  return (
    <div>
      {details?.category === "Cars" ? <CarsEdit id={id} details={details} />
      : details?.category === "Mobile Phones" ? <MobileEdit id={id} details={details} />
      : details?.category === "Real Estate" ? <RealEstateEdit id={id} details={details} />
      : "Not constructed yet" }
    </div>
  );
}

export default EditPage;