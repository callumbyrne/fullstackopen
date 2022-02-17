const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likesArray = blogs.map(blog => blog.likes)
    return likesArray.reduce((prev, cur) => prev + cur, 0)
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((prev, cur) => {
        if (cur.likes > prev.likes) {
            return prev = cur
        } else {
            return prev
        }
    })
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}