'use client'

import { getUser } from "@/services/requests";
import useSWR from "swr";
import Loading from "../loading";



const Profile = () => {
  const { data: user, isLoading } = useSWR("user", getUser);

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <div>
      <div className={'text-center font-semibold'}>{user?.id}</div>
      <div className={'text-center font-semibold'}>{user?.email}</div>
      <div className={'text-center font-semibold'}>{user?.username}</div>
    </div>
  )
}

export default Profile;