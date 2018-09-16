const users = [
    {
        email: "blai.samitier@gmail.com",
        password: process.env.PWD_SUPERUSER,
        isAdmin: true
    },
    {
        email: "aaaa",
        password: process.env.PWD_USER_A,
        isAdmin: true
    },
    {
        email: "bbbb",
        password: process.env.PWD_USER_B,
        isAdmin: false
    }
]

module.exports = users
