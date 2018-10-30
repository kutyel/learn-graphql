exports.hasPermission = ({ permissions }, permissionsNeeded) => {
  if (!permissions.filter(p => permissionsNeeded.includes(p)).length) {
    throw new Error(`You do not have sufficient permissions
      : ${permissionsNeeded}
      You Have:
      ${permissions}
      `)
  }
}
