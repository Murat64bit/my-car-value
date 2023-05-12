import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { userDto } from 'src/users/dtos/user.dto';

interface ClassContructor {
    new(...args: any[]): {}
}

export function Serialize(dto: ClassContructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {

    }
    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {

        // Reun Something before a request is handled
        // by the request handler


        return handler.handle().pipe(
            map((data: any) => {
                // Run something before the response is senout
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}