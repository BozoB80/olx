"use client";

import Image from "next/image";
import olxMale from "../../../assets/olx-male.svg";
import {
  ChatBubbleLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FolderPlusIcon,
  HeartIcon,
  MapPinIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import medal1 from "../../../assets/medal1.png";
import medal2 from "../../../assets/medal2.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeActiveUser,
  selectIsLoggedIn,
  setActiveUser,
} from "@/redux/slice/authSlice";
import { auth, db } from "@/firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getTimeAgo } from "@/utils/dateUtils";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import HeartUserButton from "@/components/HeartUserButton";
import Button from "@/components/Button";
import PublishAdd from "@/components/PublishAdd";

const Profile = ({ name }) => {
  const [adds, setAdds] = useState([]);
  const [toggleInfo, setToggleInfo] = useState(false);
  const [publish, setPublish] = useState(false)
  const [selectedTab, setSelectedTab] = useState("Active");
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();

  const [contact, setContact] = useState(null);

  const [user] = useDocument(doc(db, "users", name));
  const [userData] = useDocumentData(doc(db, "users", name));

  const date = userData && userData.createdAt.toDate().toLocaleDateString('en-GB')

  const fetchUserAdds = () => {
    try {
      const userAddsRef = collection(db, "products");
      const q = query(
        userAddsRef,
        where("userRef", "==", name),
        orderBy("createdAt", "asc")
      );

      onSnapshot(q, (snapshot) => {
        const allAdds = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAdds(allAdds);
      });
    } catch (error) {
      console.log("No adds displayed");
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  useEffect(() => {
    fetchUserAdds();
  }, [name]);



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserName(user.displayName);
        dispatch(
          setActiveUser({
            email: user.email,
            userName: user.displayName,
            userID: user.uid,
          })
        );
      } else {
        // User is signed out
        setUserName("");
        dispatch(removeActiveUser());
      }
    });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full p-1 sm:p-5">
      <div className="flex flex-col w-full lg:w-1/5 border-b lg:border-r border-gray-300 sm:pr-5 lg:h-screen">
        <div className="flex gap-3">
          <Image
            src={olxMale}
            alt="avatarphoto"
            width={56}
            height={56}
            className="rounded-full"
          />
          <div className="flex flex-col justify-center text-sm">
            <p>{userData?.displayName}</p>
            <div className="flex gap-2">
              <MapPinIcon className="w-5 h-5" />
              <p>{userData?.region}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Image src={medal1} alt="medal1" width={25} height={25} />
          <Image src={medal2} alt="medal2" width={25} height={25} />
        </div>

        <div className="flex justify-center w-full bg-white py-5 gap-3 rounded-[4px]">
          {name === auth?.currentUser?.uid ? (
            <>
              <Button label="Settings" icon={<PencilSquareIcon className="w-5 h-5" />} />
              <Button label="Publish" dark icon={<FolderPlusIcon className="w-5 h-5" />} onClick={() => setPublish(true)} />
            </>
          ) : (
            <>
              <Button label="Phone" icon={<PhoneIcon className="w-5 h-5" />} />
              <Button label="Message" icon={<ChatBubbleLeftIcon className="w-5 h-5" />} onClick={() => router.push(`/add/edit/${id}`)} />
            </>
          )}
        </div>

        {publish && <PublishAdd setPublish={setPublish} />}

        <div className="relative">
          {!toggleInfo && (
            <div
              onClick={() => setToggleInfo(true)}
              className="flex justify-between"
            >
              <h1>Information</h1>
              <ChevronDownIcon className="w-5 h-5 cursor-pointer" />
            </div>
          )}

          {toggleInfo && (
            <>
              <div
                onClick={() => setToggleInfo(false)}
                className="flex justify-between"
              >
                <h1>Information</h1>
                <ChevronUpIcon className="w-5 h-5 cursor-pointer" />
              </div>
              <div className="block w-full py-5">
                <div className="flex flex-col text-sm ">
                  <div className="flex justify-between items-center">
                    <p>Registered</p>
                    <p>{date && date}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>OLX ID</p>
                    <p>{user.id.slice(0, 4)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Online</p>
                    <p>an hour ago</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {name !== auth?.currentUser?.uid && (
            <div className="flex flex-col justify-center items-start space-y-3 py-3">
              <HeartUserButton id={name} />
              <Button label="Block User" icon={<NoSymbolIcon className="w-5 h-5" />} />
            </div>
          )}
        </div>
      </div>

      {/* fetch User Adds */}

      <div className="flex flex-col">
        <div></div>

        <div className="w-full p-1 lg:p-5 grid gap-2 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          {adds?.map((add) => {
            const createdAt = add.createdAt.toDate();
            const timeAgo = getTimeAgo(createdAt);

            return (
              <Link
                href={`/add/${add.id}`}
                key={add.id}
                className="flex flex-col h-[270px] rounded-md bg-white cursor-pointer shadow-lg"
              >
                <Image
                  src={add.imageURL}
                  alt={add.title}
                  width={300}
                  height={300}
                  className="object-cover w-[274px] h-[160px] rounded-t-md"
                />
                <div className="flex flex-col gap-2 p-2">
                  <h1 className="pb-2 truncate">{add.title}</h1>
                  <div className="flex gap-2">
                    <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm">
                      {add.fuel || add.state || add.type}
                    </p>
                    <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm">
                      {add.mileage || add.ram || add.furnished}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-xs">{timeAgo}</h1>
                    <p className="font-semibold text-sm sm:text-base">
                      {add.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      EUR
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
