
export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function BackendLink(){
    return "http://localhost:3000"
    // return "http://192.168.1.13:3000"
    // return "http://192.168.0.108:3000"
    // return "http://localhost:3000"
    // return "https://school-ms-backend.onrender.com"
    // return "http://192.168.0.108:3000"
    // return "http://192.168.50.106:3000"
}

export async function GenerateNewToken(refresh){

    try{
        const datas = await fetch( BackendLink() + "/api/v1/auth/user/newtoken" , {
            method:"POST",
            headers:{
                "refresh_token":refresh
            }
        })

        const datas_json = await datas.json()
        return datas_json

    }catch( err ){
        return err
    }


}