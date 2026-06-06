'use client'
import { useState } from 'react'
 
export default function PayButton({ priceId }: { priceId: string }) {
  const [loading, setLoading] = useState(false)
 
  const handleClick = async () => {
    setLoading(true)
    const res = await fetch('/api/billing/checkout', {
      method: 'POST',
      body: JSON.stringify({ priceId }),
    })
    const { url, error } = await res.json();
    if (error) return alert(error);
 
    window.location.href = url;
  }
 
  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Redirecting…' : 'Buy'}
    </button>
  )
}