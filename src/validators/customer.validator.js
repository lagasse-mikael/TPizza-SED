import expressValidator from 'express-validator';
const {body} = expressValidator;

class CustomerValidators{
    partial(){
        return[
            body('birthday').optional()
                .isISO8601().withMessage('Doit être une date').bail()
                .isBefore(new Date().toISOString()).withMessage('Doit être dans le passé'),
            body('coord.lat').optional()
                .isFloat({min: -1000, max:1000}).withMessage('La latitude doit être comprise entre -1000 et 1000'),
            body('coord.lon').optional()
                .isFloat({min: -1000, max:1000}).withMessage('La longitude doit être comprise entre -1000 et 1000'),
            body('phone').isLength({max:16})
        ]
    }

    complete(){
        return[
            body('name').exists().withMessage('Le nom du client est requis'),
            body('email').exists().withMessage(`L'adresse courriel est requise`),
            body('phone').exists().withMessage('Le numéro de téléphonne est requis'),
            body('birthday').exists().withMessage('La date de naissance est requise'),
            body('planet').exists().withMessage('La planète est requise'),


            ... this.partial(),
        ]
    }
}

export default new CustomerValidators();