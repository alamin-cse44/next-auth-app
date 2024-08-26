import nextAuth from "next-auth";

const handler =  nextAuth({
session: {
    strategy: "jwt",   
},
providers: [],
})

export { handler as GET, handler as POST};