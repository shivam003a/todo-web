exports.logoutController = async(req, res)=>{
    try{

        await res.cookie('todoListCookie', "", {
            expires: new Date(Date.now() + 123231),
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            msg: "logged out",
            data: null
        })

    }catch(e){
        console.error(e.message);
        res.status(500).json({
            success: false,
            msg: "internal server error",
            data: null
        })
    }
}