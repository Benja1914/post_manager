import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsAfterDate(property: string, validationOptions: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isAfterDate',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];
                    
                    if(!value || !relatedValue) return true; // If either value is not set, skip validation

                    return value instanceof Date && 
                        relatedValue instanceof Date &&
                        value >= relatedValue;
                }
            }

        })
    }
}