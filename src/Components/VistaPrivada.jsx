const useGetUserPermisssions = () => {
  // lógica para darle permisos a los usuarios 
  return ['canSeeTiltle','canEdit', 'canSave']
}

const VistaPrivada = ({ children, permissions, user }) => {
  const userPermissions = user.permissions

  if (
    permissions
      .some(permission => {
        return userPermissions.includes(permission)
      })
  ) {
    return children
  }

  return null
}

export default VistaPrivada