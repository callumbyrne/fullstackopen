const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likesArray = blogs.map(blog => blog.likes)
    return likesArray.reduce((prev, cur) => prev + cur, 0)
}

module.exports = {
    dummy,
    totalLikes
}