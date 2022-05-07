import { useQuery } from 'react-query'
import { getUserById } from '../SearchScreen/user'


/**
 * hook meant to fetch a user using react-query in order
 * to cache data and avoid unnecessary queries to be made 
 * to firestore
 * 
 * @param {String} userId of the user we want to fetch
 * @param {Object} options to be passed along to useQuery
 * @returns 
 */
 const keys = {
    user: (user) => ['user', user],
    userFollowing: (userId, otherUserId) => ['following', userId + otherUserId]
}

export const useUser = (userId, options = {}) => {
    return useQuery(keys.user(userId), () => getUserById(userId), options)
}