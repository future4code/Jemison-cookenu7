export class CustomError extends Error {
    constructor(statusCode: number, message: string){
        super(message)
    }
}

export class InvalidName extends CustomError{ 
    constructor(){
        super(400, "Nome inválido")
    }
}

export class InvalidAdmin extends CustomError{ 
    constructor(){
        super(400, "Apenas para usuarios normais.")
    }
}

export class InvalidRole extends CustomError{ 
    constructor(){
        super(400, "Tipo de usuário invalido.")
    }
}

export class InvalidEmail extends CustomError{ 
    constructor(){
        super(400, "Email inválido")
    }
}

export class InvalidPassword extends CustomError{ 
    constructor(){
        super(400, "Senha inválida")
    }
}

export class InvalidLogin extends CustomError{ 
    constructor(){
        super(400, 'Preencha os campos"email" e "password"')
    }
}

export class InvalidPasswordSignup extends CustomError{ 
    constructor(){
        super(400, "Senha deve conter o mínimo de 6 caractéries.")
    }
}

export class UserNotFound extends CustomError{ 
    constructor(){
        super(404, "Usuário não encontrado")
    }
}

export class Unauthorized extends CustomError{ 
    constructor(){
        super(401, "Usuário não autorizado")
    }
}

export class InvalidUserId extends CustomError {
    constructor(){
        super(401, "Usuário não existente.")
    }
}