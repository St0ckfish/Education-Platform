"use client";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { useGetSchoolByIdQuery } from "../../api/manageSchool";
import { useGetSchoolPermissionByIdQuery } from "../../features/[id]/api/schoolPermissions";

const ViewFeatures = () => {
  const { id } = useParams();
  const token = Cookies.get("token") || "";
  const { data: schoolData } = useGetSchoolByIdQuery({ token, id });
  const { data: schoolPermissions } = useGetSchoolPermissionByIdQuery({ token, id });
  console.log("schoolPermissions:", schoolPermissions);

  // Array of texts to display
  const features = schoolPermissions?.data || [];

  return (
    <div className="flex flex-col p-6 mx-3 mt-[70px] lg:ml-[270px]">
      <h1 className="text-2xl font-bold mb-4">
        {schoolData?.data?.name} features
      </h1>
      <div className="flex flex-col items-start gap-2">
        {features.length > 0 ? (
          features.map((feature: any, index: any) => (
            <p key={index} className="text-gray-900 m-1">
              {index + 1}. {feature.name}
            </p>
          ))
        ) : (
          <p className="text-gray-700">There is no features</p>
        )}
      </div>
    </div>
  );
};

export default ViewFeatures;
