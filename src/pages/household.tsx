import { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { Pagination } from "../component/Pagination";
import Header from "../component/Header";

const GET_Household = gql`
  query GetHousehold($offset: Int!, $limit: Int!) {
    household(offset: $offset, limit: $limit) {
      name
      id
      status
      severity
    }
  }
`;

const Household = () => {
  const [page, setPage] = useState(1);
  const limit = 5; // تعداد آیتم‌ها در هر صفحه
  const offset = (page - 1) * limit;

  const { loading, error, data } = useQuery(GET_Household, {
    variables: { offset, limit },
  });

  if (loading) return <p className="mt-4 text-center">در حال بارگذاری...</p>;
  if (error) return <p className="mt-4 text-center">خطا: {error.message}</p>;

  return (
    <div className="container p-4 mx-auto mt-10 rtl">
      {/* عنوان و دکمه ایجاد پروژه */}
      <Header onAdd={() => console.log("ایجاد خانوار جدید کلیک شد")} />

      {/* جدول پروژه‌ها */}
      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg rounded-b">
        <table className="w-full text-right border-collapse table-auto dir-rtl">
          <thead>
            <tr className="text-gray-700">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                ردیف
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                نام
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                وضعیت اطلاعات
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                وضعیت نیازمندی
              </th>
            </tr>
          </thead>

          <tbody>
            {data.household.slice(0, 3).map(
              (
                household: {
                  name: string;
                  id: number;
                  status: string;
                  severity: string;
                },
                index: number
              ) => (
                <tr
                  key={household.id}
                  className={`${
                    index % 2 !== 0 ? "bg-white" : "bg-gray-50"
                  } text-gray-800 text-right`}
                >
                  {/* ستون اعداد */}
                  <td className="px-6 py-4 text-sm">{index + 1}</td>

                  {/* ستون نام */}
                  <td className="px-6 py-4 text-sm font-medium">
                    {household.name}
                  </td>

                  {/* ستون وضعیت */}
                  <td className="px-6 py-4 text-sm">
                    {household.status === "تکمیل شده" ? (
                      <span className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded-full">
                        تکمیل شده
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                        نامشخص
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {household.severity === "عادی" ? (
                      <span className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded-full">
                        عادی
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                        اظطراری
                      </span>
                    )}
                  </td>

                  {/* ستون عملیات */}
                  <td className="px-6 py-4 text-center">
                    <button className="text-gray-500 hover:text-gray-700">
                      ...
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* دکمه‌های صفحه‌بندی */}
      <Pagination
        page={page}
        setPage={setPage}
        totalItems={100} // فرض شده
        limit={limit}
      />
    </div>
  );
};

export default Household;
