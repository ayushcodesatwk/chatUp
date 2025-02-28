import React, { useState } from "react";
import { useAuthStore } from "../store/userAuthStore";
import { Camera, User, Mail, CircleUser } from "lucide-react";


const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage ] = useState(null);

  console.log("authUser--", authUser);

  const handleImageUpload = (e) => {
      // getting the selected file
      const fileInput = e.target.files[0];

      if(!fileInput) return;

      //used to read the content of selected file
      const reader = new FileReader();

      // readAsDataURL this method reads the contents of 
      // the file and returns a data URL 
      // (a base64-encoded string) representing the file.
      reader.readAsDataURL(fileInput);

      //
      reader.onload = async () => {
          const base64String = reader.result;
          setSelectedImage(base64String);
          await updateProfile({pic: base64String});
      }
  }

  return (
    <>
      <div className="h-screen pt-20 ">
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="space-y-8 bg-base-300 rounded-xl p-6">
            {/* heading section */}
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <p className="mt-2">Your profile information</p>
            </div>

            {/* avatar upload section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectedImage || authUser.pic || "/avatar.png"}
                  alt="profile"
                  className="size-32 rounded-full object-cover border-4"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
                >
                  <Camera className="size-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className=" text-sm text-zinc-400 ">
                {isUpdatingProfile
                  ? "Uploading..."
                  : "Click the camera icon to update your photo"}
              </p>
            </div>
            
            {/* mail section */}
            <div className="space-y-6 ">
                  <div className="space-y-1.5">
                    <div className=" text-sm text-zinc-400 flex items-center gap-2">
                          <User className="size-4"/>
                          Full Name
                    </div>
                    <p className="px-4 py-2.5 bg-base-200 rounded-lg border  ">{authUser?.name}</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className=" text-sm text-zinc-400 flex items-center gap-2">
                          <Mail className="size-4"/>
                          Email Address
                    </div>
                    <p className="px-4 py-2.5 bg-base-200 rounded-lg border  ">{authUser?.email}</p>
                  </div>
            </div>

            {/* Account information */}
            <div className=" mt-6 bg-base-300 rounded-xl p-6">
              <h2 className=" text-lg font-medium mb-4 ">Account information</h2>
              <div className=" space-y-3 text-sm ">
                  <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                    <span>Member Since</span>
                    <span>{authUser.createdAt?.split("T")[0]}</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span>Account Status</span>
                    <span className=" text-green-500">Active</span>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
