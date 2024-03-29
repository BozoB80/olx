"use client";

import { useState } from "react";
import Link from "next/link";
import SavedAdds from "./adds/SavedAdds";
import SavedUsers from "./users/SavedUsers";
import SavedSearches from "./searches/SavedSearches";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const TabsPage = () => {
  const [activeTab, setActiveTab] = useState("adds");
  const searchParams  = useSearchParams()
  const router = useRouter()

  console.log(searchParams.get('tab'));

  const handleTabClick = (searchParams) => {
    setActiveTab(searchParams);
  };

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, []);

  return (
    <div>
      <ul className="flex justify-center sm:justify-start items-center">
        <li
          className={
            activeTab === "adds"
              ? "font-semibold underline text-black"
              : "text-gray-400"
          }
        >
          <Link
            href="/myolx/saved/adds"
            className="block pr-4 py-2 transition hover:scale-105"
            onClick={() => handleTabClick("adds")}
          >
            Adds
          </Link>
        </li>
        <li
          className={`${
            activeTab === "users"
              ? "font-semibold underline text-black"
              : "text-gray-400"
          }`}
        >
          <Link
            href="/myolx/saved/users"
            className="block px-4 py-2 transition hover:scale-105"
            onClick={() => handleTabClick("users")}
          >
            Users
          </Link>
        </li>
        <li
          className={`${
            activeTab === "searches"
              ? "font-semibold underline text-black"
              : "text-gray-400"
          }`}
        >
          <Link
            href="/myolx/saved/searches"
            className="block px-4 py-2 transition hover:scale-105"
            onClick={() => handleTabClick("searches")}
          >
            Searches
          </Link>
        </li>
      </ul>

      {activeTab === "adds" && <SavedAdds />}
      {activeTab === "users" && <SavedUsers />}
      {activeTab === "searches" && <SavedSearches />}
    </div>
  );
};

export default TabsPage;
