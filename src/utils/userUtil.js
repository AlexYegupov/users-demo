export function isSameUser(user1, user2) {
  return (user1||{}).slug === (user2 ||{}).slug
}

export function isUserChanged(user1, user2) {
  user1 = user1 || {}  // NOTE: default params doesn't handle null value
  user2 = user2 || {}
  return !isSameUser(user1, user2)
    || user1._timestamp !== user2._timestamp
}
