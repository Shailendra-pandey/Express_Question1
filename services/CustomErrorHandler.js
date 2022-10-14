class CustomErrorHandler extends Error{
    constructor(status, msg){
        super();
        this.status = status;
        this.message = msg;
    }

    static alreadyExist(message){
        return new CustomErrorHandler(400, message);
    }

    static wrongCredentials(message = 'email or password is not correct'){
        return new CustomErrorHandler(400, message);
    }

    static tokenNotFound(message = 'please enter valid token'){
        return new CustomErrorHandler(400, message);
    }
}

export default CustomErrorHandler;