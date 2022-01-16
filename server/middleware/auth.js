
import jwt from 'jsonwebtoken';

const auth= async (req,res,next)=>{
    try {

        //retrieving token from req
        const token=req.headers.authorization.split(" ")[1]; //splitting because the string will be of the format "Bearer ...token..."

        let decodedData;

        if(token){
            decodedData=jwt.verify(token, 'test');
            req.userId= decodedData?.id;

        }

        next(); //refers to the next action
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export default auth;