import React, { useEffect, useState } from 'react'
import { checkedAuthByApi, getProfileByApi } from '../../api/profile';

export default function Test() {

  const [user, setUser] = useState(null);
  useEffect(() => {

    getProfile();

  }, [])

  async function getProfile() {
    const user = await checkedAuthByApi();
    setUser(user);

  }
  return (
    <div>Test</div>
  )
}
