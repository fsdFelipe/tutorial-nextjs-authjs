import { RoleGate } from '@/components/auth/RoleGate'
import React from 'react'

const page = () => {
  return (
    <RoleGate allowedRole="ADMIN">
    <div>pagina Dashboard</div>
    </RoleGate>
  )
}
export default page