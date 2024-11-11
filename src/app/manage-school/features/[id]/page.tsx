"use client";
import FeaturesList from "@/components/ExpandableList";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner";
import { useGetSchoolPermissionsQuery, useGetSchoolPlansQuery } from "./api/schoolPermissions";
import { useParams } from "next/navigation";
import { useGetSchoolByIdQuery } from "../../api/manageSchool";
import Container from "@/components/Container";

const Features = () => {
  const { id } = useParams();
  const token = Cookies.get("token") || "";
  const { isSuccess, data } = useGetSchoolPermissionsQuery(token);
  console.log("Permissions", data?.data);
  const f = data?.data;
  
  const [features, setFeatures] = useState<any[]>([]);
  
  useEffect(() => {
    // Simulate fetching data (you can replace this with your API call)
    const response = data;

    // Set the features data from the response
    setFeatures(response?.data);
  }, [data]);

  const { data: dataPlans } = useGetSchoolPlansQuery({token, id});
  console.log("dataPlans: ", dataPlans);

  const {data: schoolData} = useGetSchoolByIdQuery({token, id});
  // console.log("schoolData: ", schoolData);

  return (
    <>
      <Container className="mt-[70px]">
      {features && features.length > 0 ? (
        <div className="rounded-xl pb-5">
          <div className="flex rounded-t-xl bg-blue-100 px-10 py-4 text-[18px] font-semibold">
            <div className="flex justify-between w-full text-black">
            <p>{schoolData?.data?.name} features</p>
            <a href={`/manage-school/view-features/${id}`} className="text-blue-500 cursor-pointer">View Features</a>
            </div>

          </div>
          <div>
      {/* Add a check to ensure features are not undefined or null */}
        <FeaturesList features={features} token={token} />
    </div>
        </div>
      ) : (
        <Spinner /> 
  )}
      </Container>
    </>
  );
};

export default Features;
