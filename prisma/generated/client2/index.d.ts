
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model admin
 * 
 */
export type admin = $Result.DefaultSelection<Prisma.$adminPayload>
/**
 * Model audio
 * 
 */
export type audio = $Result.DefaultSelection<Prisma.$audioPayload>
/**
 * Model language
 * 
 */
export type language = $Result.DefaultSelection<Prisma.$languagePayload>
/**
 * Model place
 * 
 */
export type place = $Result.DefaultSelection<Prisma.$placePayload>
/**
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AdminRoles: {
  superadmin: 'superadmin',
  admin: 'admin'
};

export type AdminRoles = (typeof AdminRoles)[keyof typeof AdminRoles]

}

export type AdminRoles = $Enums.AdminRoles

export const AdminRoles: typeof $Enums.AdminRoles

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Admins
 * const admins = await prisma.admin.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Admins
   * const admins = await prisma.admin.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.admin`: Exposes CRUD operations for the **admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.adminDelegate<ExtArgs>;

  /**
   * `prisma.audio`: Exposes CRUD operations for the **audio** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Audio
    * const audio = await prisma.audio.findMany()
    * ```
    */
  get audio(): Prisma.audioDelegate<ExtArgs>;

  /**
   * `prisma.language`: Exposes CRUD operations for the **language** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Languages
    * const languages = await prisma.language.findMany()
    * ```
    */
  get language(): Prisma.languageDelegate<ExtArgs>;

  /**
   * `prisma.place`: Exposes CRUD operations for the **place** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Places
    * const places = await prisma.place.findMany()
    * ```
    */
  get place(): Prisma.placeDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.18.0
   * Query Engine version: 4c784e32044a8a016d99474bd02a3b6123742169
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    admin: 'admin',
    audio: 'audio',
    language: 'language',
    place: 'place',
    user: 'user'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "admin" | "audio" | "language" | "place" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      admin: {
        payload: Prisma.$adminPayload<ExtArgs>
        fields: Prisma.adminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.adminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.adminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          findFirst: {
            args: Prisma.adminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.adminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          findMany: {
            args: Prisma.adminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>[]
          }
          create: {
            args: Prisma.adminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          createMany: {
            args: Prisma.adminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.adminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>[]
          }
          delete: {
            args: Prisma.adminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          update: {
            args: Prisma.adminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          deleteMany: {
            args: Prisma.adminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.adminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.adminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.adminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.adminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      audio: {
        payload: Prisma.$audioPayload<ExtArgs>
        fields: Prisma.audioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.audioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.audioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audioPayload>
          }
          findFirst: {
            args: Prisma.audioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.audioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audioPayload>
          }
          findMany: {
            args: Prisma.audioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audioPayload>[]
          }
          create: {
            args: Prisma.audioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audioPayload>
          }
          createMany: {
            args: Prisma.audioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.audioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audioPayload>[]
          }
          delete: {
            args: Prisma.audioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audioPayload>
          }
          update: {
            args: Prisma.audioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audioPayload>
          }
          deleteMany: {
            args: Prisma.audioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.audioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.audioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audioPayload>
          }
          aggregate: {
            args: Prisma.AudioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAudio>
          }
          groupBy: {
            args: Prisma.audioGroupByArgs<ExtArgs>
            result: $Utils.Optional<AudioGroupByOutputType>[]
          }
          count: {
            args: Prisma.audioCountArgs<ExtArgs>
            result: $Utils.Optional<AudioCountAggregateOutputType> | number
          }
        }
      }
      language: {
        payload: Prisma.$languagePayload<ExtArgs>
        fields: Prisma.languageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.languageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$languagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.languageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$languagePayload>
          }
          findFirst: {
            args: Prisma.languageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$languagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.languageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$languagePayload>
          }
          findMany: {
            args: Prisma.languageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$languagePayload>[]
          }
          create: {
            args: Prisma.languageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$languagePayload>
          }
          createMany: {
            args: Prisma.languageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.languageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$languagePayload>[]
          }
          delete: {
            args: Prisma.languageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$languagePayload>
          }
          update: {
            args: Prisma.languageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$languagePayload>
          }
          deleteMany: {
            args: Prisma.languageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.languageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.languageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$languagePayload>
          }
          aggregate: {
            args: Prisma.LanguageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLanguage>
          }
          groupBy: {
            args: Prisma.languageGroupByArgs<ExtArgs>
            result: $Utils.Optional<LanguageGroupByOutputType>[]
          }
          count: {
            args: Prisma.languageCountArgs<ExtArgs>
            result: $Utils.Optional<LanguageCountAggregateOutputType> | number
          }
        }
      }
      place: {
        payload: Prisma.$placePayload<ExtArgs>
        fields: Prisma.placeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.placeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.placeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placePayload>
          }
          findFirst: {
            args: Prisma.placeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.placeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placePayload>
          }
          findMany: {
            args: Prisma.placeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placePayload>[]
          }
          create: {
            args: Prisma.placeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placePayload>
          }
          createMany: {
            args: Prisma.placeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.placeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placePayload>[]
          }
          delete: {
            args: Prisma.placeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placePayload>
          }
          update: {
            args: Prisma.placeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placePayload>
          }
          deleteMany: {
            args: Prisma.placeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.placeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.placeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placePayload>
          }
          aggregate: {
            args: Prisma.PlaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlace>
          }
          groupBy: {
            args: Prisma.placeGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.placeCountArgs<ExtArgs>
            result: $Utils.Optional<PlaceCountAggregateOutputType> | number
          }
        }
      }
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.userCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AdminCountOutputType
   */

  export type AdminCountOutputType = {
    audio: number
    language: number
    place: number
    user: number
  }

  export type AdminCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audio?: boolean | AdminCountOutputTypeCountAudioArgs
    language?: boolean | AdminCountOutputTypeCountLanguageArgs
    place?: boolean | AdminCountOutputTypeCountPlaceArgs
    user?: boolean | AdminCountOutputTypeCountUserArgs
  }

  // Custom InputTypes
  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminCountOutputType
     */
    select?: AdminCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountAudioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: audioWhereInput
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountLanguageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: languageWhereInput
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountPlaceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: placeWhereInput
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
  }


  /**
   * Count Type PlaceCountOutputType
   */

  export type PlaceCountOutputType = {
    user: number
  }

  export type PlaceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | PlaceCountOutputTypeCountUserArgs
  }

  // Custom InputTypes
  /**
   * PlaceCountOutputType without action
   */
  export type PlaceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaceCountOutputType
     */
    select?: PlaceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlaceCountOutputType without action
   */
  export type PlaceCountOutputTypeCountUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
  }


  /**
   * Models
   */

  /**
   * Model admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    id: string | null
    name: string | null
    username: string | null
    password: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    id: string | null
    name: string | null
    username: string | null
    password: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    name: number
    username: number
    password: number
    created_at: number
    updated_at: number
    roles: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    id?: true
    name?: true
    username?: true
    password?: true
    created_at?: true
    updated_at?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    name?: true
    username?: true
    password?: true
    created_at?: true
    updated_at?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    name?: true
    username?: true
    password?: true
    created_at?: true
    updated_at?: true
    roles?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which admin to aggregate.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type adminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: adminWhereInput
    orderBy?: adminOrderByWithAggregationInput | adminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: adminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: string
    name: string
    username: string
    password: string
    created_at: Date
    updated_at: Date
    roles: $Enums.AdminRoles[]
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends adminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type adminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    username?: boolean
    password?: boolean
    created_at?: boolean
    updated_at?: boolean
    roles?: boolean
    audio?: boolean | admin$audioArgs<ExtArgs>
    language?: boolean | admin$languageArgs<ExtArgs>
    place?: boolean | admin$placeArgs<ExtArgs>
    user?: boolean | admin$userArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type adminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    username?: boolean
    password?: boolean
    created_at?: boolean
    updated_at?: boolean
    roles?: boolean
  }, ExtArgs["result"]["admin"]>

  export type adminSelectScalar = {
    id?: boolean
    name?: boolean
    username?: boolean
    password?: boolean
    created_at?: boolean
    updated_at?: boolean
    roles?: boolean
  }

  export type adminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audio?: boolean | admin$audioArgs<ExtArgs>
    language?: boolean | admin$languageArgs<ExtArgs>
    place?: boolean | admin$placeArgs<ExtArgs>
    user?: boolean | admin$userArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type adminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $adminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "admin"
    objects: {
      audio: Prisma.$audioPayload<ExtArgs>[]
      language: Prisma.$languagePayload<ExtArgs>[]
      place: Prisma.$placePayload<ExtArgs>[]
      user: Prisma.$userPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      username: string
      password: string
      created_at: Date
      updated_at: Date
      roles: $Enums.AdminRoles[]
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type adminGetPayload<S extends boolean | null | undefined | adminDefaultArgs> = $Result.GetResult<Prisma.$adminPayload, S>

  type adminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<adminFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface adminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['admin'], meta: { name: 'admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {adminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends adminFindUniqueArgs>(args: SelectSubset<T, adminFindUniqueArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {adminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends adminFindUniqueOrThrowArgs>(args: SelectSubset<T, adminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends adminFindFirstArgs>(args?: SelectSubset<T, adminFindFirstArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends adminFindFirstOrThrowArgs>(args?: SelectSubset<T, adminFindFirstOrThrowArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends adminFindManyArgs>(args?: SelectSubset<T, adminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Admin.
     * @param {adminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends adminCreateArgs>(args: SelectSubset<T, adminCreateArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Admins.
     * @param {adminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends adminCreateManyArgs>(args?: SelectSubset<T, adminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {adminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends adminCreateManyAndReturnArgs>(args?: SelectSubset<T, adminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Admin.
     * @param {adminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends adminDeleteArgs>(args: SelectSubset<T, adminDeleteArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Admin.
     * @param {adminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends adminUpdateArgs>(args: SelectSubset<T, adminUpdateArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Admins.
     * @param {adminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends adminDeleteManyArgs>(args?: SelectSubset<T, adminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends adminUpdateManyArgs>(args: SelectSubset<T, adminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Admin.
     * @param {adminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends adminUpsertArgs>(args: SelectSubset<T, adminUpsertArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends adminCountArgs>(
      args?: Subset<T, adminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends adminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: adminGroupByArgs['orderBy'] }
        : { orderBy?: adminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, adminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the admin model
   */
  readonly fields: adminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__adminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    audio<T extends admin$audioArgs<ExtArgs> = {}>(args?: Subset<T, admin$audioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$audioPayload<ExtArgs>, T, "findMany"> | Null>
    language<T extends admin$languageArgs<ExtArgs> = {}>(args?: Subset<T, admin$languageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$languagePayload<ExtArgs>, T, "findMany"> | Null>
    place<T extends admin$placeArgs<ExtArgs> = {}>(args?: Subset<T, admin$placeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$placePayload<ExtArgs>, T, "findMany"> | Null>
    user<T extends admin$userArgs<ExtArgs> = {}>(args?: Subset<T, admin$userArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the admin model
   */ 
  interface adminFieldRefs {
    readonly id: FieldRef<"admin", 'String'>
    readonly name: FieldRef<"admin", 'String'>
    readonly username: FieldRef<"admin", 'String'>
    readonly password: FieldRef<"admin", 'String'>
    readonly created_at: FieldRef<"admin", 'DateTime'>
    readonly updated_at: FieldRef<"admin", 'DateTime'>
    readonly roles: FieldRef<"admin", 'AdminRoles[]'>
  }
    

  // Custom InputTypes
  /**
   * admin findUnique
   */
  export type adminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin findUniqueOrThrow
   */
  export type adminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin findFirst
   */
  export type adminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for admins.
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * admin findFirstOrThrow
   */
  export type adminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for admins.
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * admin findMany
   */
  export type adminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter, which admins to fetch.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing admins.
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * admin create
   */
  export type adminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * The data needed to create a admin.
     */
    data: XOR<adminCreateInput, adminUncheckedCreateInput>
  }

  /**
   * admin createMany
   */
  export type adminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many admins.
     */
    data: adminCreateManyInput | adminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * admin createManyAndReturn
   */
  export type adminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many admins.
     */
    data: adminCreateManyInput | adminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * admin update
   */
  export type adminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * The data needed to update a admin.
     */
    data: XOR<adminUpdateInput, adminUncheckedUpdateInput>
    /**
     * Choose, which admin to update.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin updateMany
   */
  export type adminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update admins.
     */
    data: XOR<adminUpdateManyMutationInput, adminUncheckedUpdateManyInput>
    /**
     * Filter which admins to update
     */
    where?: adminWhereInput
  }

  /**
   * admin upsert
   */
  export type adminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * The filter to search for the admin to update in case it exists.
     */
    where: adminWhereUniqueInput
    /**
     * In case the admin found by the `where` argument doesn't exist, create a new admin with this data.
     */
    create: XOR<adminCreateInput, adminUncheckedCreateInput>
    /**
     * In case the admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<adminUpdateInput, adminUncheckedUpdateInput>
  }

  /**
   * admin delete
   */
  export type adminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter which admin to delete.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin deleteMany
   */
  export type adminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which admins to delete
     */
    where?: adminWhereInput
  }

  /**
   * admin.audio
   */
  export type admin$audioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audio
     */
    select?: audioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audioInclude<ExtArgs> | null
    where?: audioWhereInput
    orderBy?: audioOrderByWithRelationInput | audioOrderByWithRelationInput[]
    cursor?: audioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AudioScalarFieldEnum | AudioScalarFieldEnum[]
  }

  /**
   * admin.language
   */
  export type admin$languageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the language
     */
    select?: languageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: languageInclude<ExtArgs> | null
    where?: languageWhereInput
    orderBy?: languageOrderByWithRelationInput | languageOrderByWithRelationInput[]
    cursor?: languageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LanguageScalarFieldEnum | LanguageScalarFieldEnum[]
  }

  /**
   * admin.place
   */
  export type admin$placeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the place
     */
    select?: placeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placeInclude<ExtArgs> | null
    where?: placeWhereInput
    orderBy?: placeOrderByWithRelationInput | placeOrderByWithRelationInput[]
    cursor?: placeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlaceScalarFieldEnum | PlaceScalarFieldEnum[]
  }

  /**
   * admin.user
   */
  export type admin$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    where?: userWhereInput
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    cursor?: userWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * admin without action
   */
  export type adminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
  }


  /**
   * Model audio
   */

  export type AggregateAudio = {
    _count: AudioCountAggregateOutputType | null
    _min: AudioMinAggregateOutputType | null
    _max: AudioMaxAggregateOutputType | null
  }

  export type AudioMinAggregateOutputType = {
    place_id: string | null
    language_id: string | null
    admin_id: string | null
    created_at: Date | null
    updated_at: Date | null
    file_path: string | null
    file_url: string | null
    id: string | null
  }

  export type AudioMaxAggregateOutputType = {
    place_id: string | null
    language_id: string | null
    admin_id: string | null
    created_at: Date | null
    updated_at: Date | null
    file_path: string | null
    file_url: string | null
    id: string | null
  }

  export type AudioCountAggregateOutputType = {
    img_path: number
    place_id: number
    language_id: number
    admin_id: number
    created_at: number
    updated_at: number
    file_path: number
    file_url: number
    img_url: number
    id: number
    _all: number
  }


  export type AudioMinAggregateInputType = {
    place_id?: true
    language_id?: true
    admin_id?: true
    created_at?: true
    updated_at?: true
    file_path?: true
    file_url?: true
    id?: true
  }

  export type AudioMaxAggregateInputType = {
    place_id?: true
    language_id?: true
    admin_id?: true
    created_at?: true
    updated_at?: true
    file_path?: true
    file_url?: true
    id?: true
  }

  export type AudioCountAggregateInputType = {
    img_path?: true
    place_id?: true
    language_id?: true
    admin_id?: true
    created_at?: true
    updated_at?: true
    file_path?: true
    file_url?: true
    img_url?: true
    id?: true
    _all?: true
  }

  export type AudioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which audio to aggregate.
     */
    where?: audioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of audio to fetch.
     */
    orderBy?: audioOrderByWithRelationInput | audioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: audioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` audio from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` audio.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned audio
    **/
    _count?: true | AudioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AudioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AudioMaxAggregateInputType
  }

  export type GetAudioAggregateType<T extends AudioAggregateArgs> = {
        [P in keyof T & keyof AggregateAudio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAudio[P]>
      : GetScalarType<T[P], AggregateAudio[P]>
  }




  export type audioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: audioWhereInput
    orderBy?: audioOrderByWithAggregationInput | audioOrderByWithAggregationInput[]
    by: AudioScalarFieldEnum[] | AudioScalarFieldEnum
    having?: audioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AudioCountAggregateInputType | true
    _min?: AudioMinAggregateInputType
    _max?: AudioMaxAggregateInputType
  }

  export type AudioGroupByOutputType = {
    img_path: string[]
    place_id: string
    language_id: string
    admin_id: string | null
    created_at: Date
    updated_at: Date
    file_path: string
    file_url: string
    img_url: string[]
    id: string
    _count: AudioCountAggregateOutputType | null
    _min: AudioMinAggregateOutputType | null
    _max: AudioMaxAggregateOutputType | null
  }

  type GetAudioGroupByPayload<T extends audioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AudioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AudioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AudioGroupByOutputType[P]>
            : GetScalarType<T[P], AudioGroupByOutputType[P]>
        }
      >
    >


  export type audioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    img_path?: boolean
    place_id?: boolean
    language_id?: boolean
    admin_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    file_path?: boolean
    file_url?: boolean
    img_url?: boolean
    id?: boolean
    admin?: boolean | audio$adminArgs<ExtArgs>
  }, ExtArgs["result"]["audio"]>

  export type audioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    img_path?: boolean
    place_id?: boolean
    language_id?: boolean
    admin_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    file_path?: boolean
    file_url?: boolean
    img_url?: boolean
    id?: boolean
    admin?: boolean | audio$adminArgs<ExtArgs>
  }, ExtArgs["result"]["audio"]>

  export type audioSelectScalar = {
    img_path?: boolean
    place_id?: boolean
    language_id?: boolean
    admin_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    file_path?: boolean
    file_url?: boolean
    img_url?: boolean
    id?: boolean
  }

  export type audioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | audio$adminArgs<ExtArgs>
  }
  export type audioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | audio$adminArgs<ExtArgs>
  }

  export type $audioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "audio"
    objects: {
      admin: Prisma.$adminPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      img_path: string[]
      place_id: string
      language_id: string
      admin_id: string | null
      created_at: Date
      updated_at: Date
      file_path: string
      file_url: string
      img_url: string[]
      id: string
    }, ExtArgs["result"]["audio"]>
    composites: {}
  }

  type audioGetPayload<S extends boolean | null | undefined | audioDefaultArgs> = $Result.GetResult<Prisma.$audioPayload, S>

  type audioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<audioFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AudioCountAggregateInputType | true
    }

  export interface audioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['audio'], meta: { name: 'audio' } }
    /**
     * Find zero or one Audio that matches the filter.
     * @param {audioFindUniqueArgs} args - Arguments to find a Audio
     * @example
     * // Get one Audio
     * const audio = await prisma.audio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends audioFindUniqueArgs>(args: SelectSubset<T, audioFindUniqueArgs<ExtArgs>>): Prisma__audioClient<$Result.GetResult<Prisma.$audioPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Audio that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {audioFindUniqueOrThrowArgs} args - Arguments to find a Audio
     * @example
     * // Get one Audio
     * const audio = await prisma.audio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends audioFindUniqueOrThrowArgs>(args: SelectSubset<T, audioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__audioClient<$Result.GetResult<Prisma.$audioPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Audio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audioFindFirstArgs} args - Arguments to find a Audio
     * @example
     * // Get one Audio
     * const audio = await prisma.audio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends audioFindFirstArgs>(args?: SelectSubset<T, audioFindFirstArgs<ExtArgs>>): Prisma__audioClient<$Result.GetResult<Prisma.$audioPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Audio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audioFindFirstOrThrowArgs} args - Arguments to find a Audio
     * @example
     * // Get one Audio
     * const audio = await prisma.audio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends audioFindFirstOrThrowArgs>(args?: SelectSubset<T, audioFindFirstOrThrowArgs<ExtArgs>>): Prisma__audioClient<$Result.GetResult<Prisma.$audioPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Audio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Audio
     * const audio = await prisma.audio.findMany()
     * 
     * // Get first 10 Audio
     * const audio = await prisma.audio.findMany({ take: 10 })
     * 
     * // Only select the `img_path`
     * const audioWithImg_pathOnly = await prisma.audio.findMany({ select: { img_path: true } })
     * 
     */
    findMany<T extends audioFindManyArgs>(args?: SelectSubset<T, audioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$audioPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Audio.
     * @param {audioCreateArgs} args - Arguments to create a Audio.
     * @example
     * // Create one Audio
     * const Audio = await prisma.audio.create({
     *   data: {
     *     // ... data to create a Audio
     *   }
     * })
     * 
     */
    create<T extends audioCreateArgs>(args: SelectSubset<T, audioCreateArgs<ExtArgs>>): Prisma__audioClient<$Result.GetResult<Prisma.$audioPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Audio.
     * @param {audioCreateManyArgs} args - Arguments to create many Audio.
     * @example
     * // Create many Audio
     * const audio = await prisma.audio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends audioCreateManyArgs>(args?: SelectSubset<T, audioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Audio and returns the data saved in the database.
     * @param {audioCreateManyAndReturnArgs} args - Arguments to create many Audio.
     * @example
     * // Create many Audio
     * const audio = await prisma.audio.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Audio and only return the `img_path`
     * const audioWithImg_pathOnly = await prisma.audio.createManyAndReturn({ 
     *   select: { img_path: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends audioCreateManyAndReturnArgs>(args?: SelectSubset<T, audioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$audioPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Audio.
     * @param {audioDeleteArgs} args - Arguments to delete one Audio.
     * @example
     * // Delete one Audio
     * const Audio = await prisma.audio.delete({
     *   where: {
     *     // ... filter to delete one Audio
     *   }
     * })
     * 
     */
    delete<T extends audioDeleteArgs>(args: SelectSubset<T, audioDeleteArgs<ExtArgs>>): Prisma__audioClient<$Result.GetResult<Prisma.$audioPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Audio.
     * @param {audioUpdateArgs} args - Arguments to update one Audio.
     * @example
     * // Update one Audio
     * const audio = await prisma.audio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends audioUpdateArgs>(args: SelectSubset<T, audioUpdateArgs<ExtArgs>>): Prisma__audioClient<$Result.GetResult<Prisma.$audioPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Audio.
     * @param {audioDeleteManyArgs} args - Arguments to filter Audio to delete.
     * @example
     * // Delete a few Audio
     * const { count } = await prisma.audio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends audioDeleteManyArgs>(args?: SelectSubset<T, audioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Audio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Audio
     * const audio = await prisma.audio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends audioUpdateManyArgs>(args: SelectSubset<T, audioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Audio.
     * @param {audioUpsertArgs} args - Arguments to update or create a Audio.
     * @example
     * // Update or create a Audio
     * const audio = await prisma.audio.upsert({
     *   create: {
     *     // ... data to create a Audio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Audio we want to update
     *   }
     * })
     */
    upsert<T extends audioUpsertArgs>(args: SelectSubset<T, audioUpsertArgs<ExtArgs>>): Prisma__audioClient<$Result.GetResult<Prisma.$audioPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Audio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audioCountArgs} args - Arguments to filter Audio to count.
     * @example
     * // Count the number of Audio
     * const count = await prisma.audio.count({
     *   where: {
     *     // ... the filter for the Audio we want to count
     *   }
     * })
    **/
    count<T extends audioCountArgs>(
      args?: Subset<T, audioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AudioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Audio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AudioAggregateArgs>(args: Subset<T, AudioAggregateArgs>): Prisma.PrismaPromise<GetAudioAggregateType<T>>

    /**
     * Group by Audio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends audioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: audioGroupByArgs['orderBy'] }
        : { orderBy?: audioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, audioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAudioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the audio model
   */
  readonly fields: audioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for audio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__audioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends audio$adminArgs<ExtArgs> = {}>(args?: Subset<T, audio$adminArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the audio model
   */ 
  interface audioFieldRefs {
    readonly img_path: FieldRef<"audio", 'String[]'>
    readonly place_id: FieldRef<"audio", 'String'>
    readonly language_id: FieldRef<"audio", 'String'>
    readonly admin_id: FieldRef<"audio", 'String'>
    readonly created_at: FieldRef<"audio", 'DateTime'>
    readonly updated_at: FieldRef<"audio", 'DateTime'>
    readonly file_path: FieldRef<"audio", 'String'>
    readonly file_url: FieldRef<"audio", 'String'>
    readonly img_url: FieldRef<"audio", 'String[]'>
    readonly id: FieldRef<"audio", 'String'>
  }
    

  // Custom InputTypes
  /**
   * audio findUnique
   */
  export type audioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audio
     */
    select?: audioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audioInclude<ExtArgs> | null
    /**
     * Filter, which audio to fetch.
     */
    where: audioWhereUniqueInput
  }

  /**
   * audio findUniqueOrThrow
   */
  export type audioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audio
     */
    select?: audioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audioInclude<ExtArgs> | null
    /**
     * Filter, which audio to fetch.
     */
    where: audioWhereUniqueInput
  }

  /**
   * audio findFirst
   */
  export type audioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audio
     */
    select?: audioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audioInclude<ExtArgs> | null
    /**
     * Filter, which audio to fetch.
     */
    where?: audioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of audio to fetch.
     */
    orderBy?: audioOrderByWithRelationInput | audioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for audio.
     */
    cursor?: audioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` audio from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` audio.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of audio.
     */
    distinct?: AudioScalarFieldEnum | AudioScalarFieldEnum[]
  }

  /**
   * audio findFirstOrThrow
   */
  export type audioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audio
     */
    select?: audioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audioInclude<ExtArgs> | null
    /**
     * Filter, which audio to fetch.
     */
    where?: audioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of audio to fetch.
     */
    orderBy?: audioOrderByWithRelationInput | audioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for audio.
     */
    cursor?: audioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` audio from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` audio.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of audio.
     */
    distinct?: AudioScalarFieldEnum | AudioScalarFieldEnum[]
  }

  /**
   * audio findMany
   */
  export type audioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audio
     */
    select?: audioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audioInclude<ExtArgs> | null
    /**
     * Filter, which audio to fetch.
     */
    where?: audioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of audio to fetch.
     */
    orderBy?: audioOrderByWithRelationInput | audioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing audio.
     */
    cursor?: audioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` audio from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` audio.
     */
    skip?: number
    distinct?: AudioScalarFieldEnum | AudioScalarFieldEnum[]
  }

  /**
   * audio create
   */
  export type audioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audio
     */
    select?: audioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audioInclude<ExtArgs> | null
    /**
     * The data needed to create a audio.
     */
    data: XOR<audioCreateInput, audioUncheckedCreateInput>
  }

  /**
   * audio createMany
   */
  export type audioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many audio.
     */
    data: audioCreateManyInput | audioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * audio createManyAndReturn
   */
  export type audioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audio
     */
    select?: audioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many audio.
     */
    data: audioCreateManyInput | audioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * audio update
   */
  export type audioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audio
     */
    select?: audioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audioInclude<ExtArgs> | null
    /**
     * The data needed to update a audio.
     */
    data: XOR<audioUpdateInput, audioUncheckedUpdateInput>
    /**
     * Choose, which audio to update.
     */
    where: audioWhereUniqueInput
  }

  /**
   * audio updateMany
   */
  export type audioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update audio.
     */
    data: XOR<audioUpdateManyMutationInput, audioUncheckedUpdateManyInput>
    /**
     * Filter which audio to update
     */
    where?: audioWhereInput
  }

  /**
   * audio upsert
   */
  export type audioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audio
     */
    select?: audioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audioInclude<ExtArgs> | null
    /**
     * The filter to search for the audio to update in case it exists.
     */
    where: audioWhereUniqueInput
    /**
     * In case the audio found by the `where` argument doesn't exist, create a new audio with this data.
     */
    create: XOR<audioCreateInput, audioUncheckedCreateInput>
    /**
     * In case the audio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<audioUpdateInput, audioUncheckedUpdateInput>
  }

  /**
   * audio delete
   */
  export type audioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audio
     */
    select?: audioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audioInclude<ExtArgs> | null
    /**
     * Filter which audio to delete.
     */
    where: audioWhereUniqueInput
  }

  /**
   * audio deleteMany
   */
  export type audioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which audio to delete
     */
    where?: audioWhereInput
  }

  /**
   * audio.admin
   */
  export type audio$adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    where?: adminWhereInput
  }

  /**
   * audio without action
   */
  export type audioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audio
     */
    select?: audioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audioInclude<ExtArgs> | null
  }


  /**
   * Model language
   */

  export type AggregateLanguage = {
    _count: LanguageCountAggregateOutputType | null
    _min: LanguageMinAggregateOutputType | null
    _max: LanguageMaxAggregateOutputType | null
  }

  export type LanguageMinAggregateOutputType = {
    id: string | null
    name: string | null
    img_path: string | null
    admin_id: string | null
    created_at: Date | null
    updated_at: Date | null
    img_url: string | null
  }

  export type LanguageMaxAggregateOutputType = {
    id: string | null
    name: string | null
    img_path: string | null
    admin_id: string | null
    created_at: Date | null
    updated_at: Date | null
    img_url: string | null
  }

  export type LanguageCountAggregateOutputType = {
    id: number
    name: number
    img_path: number
    admin_id: number
    created_at: number
    updated_at: number
    img_url: number
    _all: number
  }


  export type LanguageMinAggregateInputType = {
    id?: true
    name?: true
    img_path?: true
    admin_id?: true
    created_at?: true
    updated_at?: true
    img_url?: true
  }

  export type LanguageMaxAggregateInputType = {
    id?: true
    name?: true
    img_path?: true
    admin_id?: true
    created_at?: true
    updated_at?: true
    img_url?: true
  }

  export type LanguageCountAggregateInputType = {
    id?: true
    name?: true
    img_path?: true
    admin_id?: true
    created_at?: true
    updated_at?: true
    img_url?: true
    _all?: true
  }

  export type LanguageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which language to aggregate.
     */
    where?: languageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of languages to fetch.
     */
    orderBy?: languageOrderByWithRelationInput | languageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: languageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` languages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` languages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned languages
    **/
    _count?: true | LanguageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LanguageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LanguageMaxAggregateInputType
  }

  export type GetLanguageAggregateType<T extends LanguageAggregateArgs> = {
        [P in keyof T & keyof AggregateLanguage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLanguage[P]>
      : GetScalarType<T[P], AggregateLanguage[P]>
  }




  export type languageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: languageWhereInput
    orderBy?: languageOrderByWithAggregationInput | languageOrderByWithAggregationInput[]
    by: LanguageScalarFieldEnum[] | LanguageScalarFieldEnum
    having?: languageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LanguageCountAggregateInputType | true
    _min?: LanguageMinAggregateInputType
    _max?: LanguageMaxAggregateInputType
  }

  export type LanguageGroupByOutputType = {
    id: string
    name: string
    img_path: string
    admin_id: string | null
    created_at: Date
    updated_at: Date
    img_url: string
    _count: LanguageCountAggregateOutputType | null
    _min: LanguageMinAggregateOutputType | null
    _max: LanguageMaxAggregateOutputType | null
  }

  type GetLanguageGroupByPayload<T extends languageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LanguageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LanguageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LanguageGroupByOutputType[P]>
            : GetScalarType<T[P], LanguageGroupByOutputType[P]>
        }
      >
    >


  export type languageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    img_path?: boolean
    admin_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    img_url?: boolean
    admin?: boolean | language$adminArgs<ExtArgs>
  }, ExtArgs["result"]["language"]>

  export type languageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    img_path?: boolean
    admin_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    img_url?: boolean
    admin?: boolean | language$adminArgs<ExtArgs>
  }, ExtArgs["result"]["language"]>

  export type languageSelectScalar = {
    id?: boolean
    name?: boolean
    img_path?: boolean
    admin_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    img_url?: boolean
  }

  export type languageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | language$adminArgs<ExtArgs>
  }
  export type languageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | language$adminArgs<ExtArgs>
  }

  export type $languagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "language"
    objects: {
      admin: Prisma.$adminPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      img_path: string
      admin_id: string | null
      created_at: Date
      updated_at: Date
      img_url: string
    }, ExtArgs["result"]["language"]>
    composites: {}
  }

  type languageGetPayload<S extends boolean | null | undefined | languageDefaultArgs> = $Result.GetResult<Prisma.$languagePayload, S>

  type languageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<languageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LanguageCountAggregateInputType | true
    }

  export interface languageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['language'], meta: { name: 'language' } }
    /**
     * Find zero or one Language that matches the filter.
     * @param {languageFindUniqueArgs} args - Arguments to find a Language
     * @example
     * // Get one Language
     * const language = await prisma.language.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends languageFindUniqueArgs>(args: SelectSubset<T, languageFindUniqueArgs<ExtArgs>>): Prisma__languageClient<$Result.GetResult<Prisma.$languagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Language that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {languageFindUniqueOrThrowArgs} args - Arguments to find a Language
     * @example
     * // Get one Language
     * const language = await prisma.language.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends languageFindUniqueOrThrowArgs>(args: SelectSubset<T, languageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__languageClient<$Result.GetResult<Prisma.$languagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Language that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {languageFindFirstArgs} args - Arguments to find a Language
     * @example
     * // Get one Language
     * const language = await prisma.language.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends languageFindFirstArgs>(args?: SelectSubset<T, languageFindFirstArgs<ExtArgs>>): Prisma__languageClient<$Result.GetResult<Prisma.$languagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Language that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {languageFindFirstOrThrowArgs} args - Arguments to find a Language
     * @example
     * // Get one Language
     * const language = await prisma.language.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends languageFindFirstOrThrowArgs>(args?: SelectSubset<T, languageFindFirstOrThrowArgs<ExtArgs>>): Prisma__languageClient<$Result.GetResult<Prisma.$languagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Languages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {languageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Languages
     * const languages = await prisma.language.findMany()
     * 
     * // Get first 10 Languages
     * const languages = await prisma.language.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const languageWithIdOnly = await prisma.language.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends languageFindManyArgs>(args?: SelectSubset<T, languageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$languagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Language.
     * @param {languageCreateArgs} args - Arguments to create a Language.
     * @example
     * // Create one Language
     * const Language = await prisma.language.create({
     *   data: {
     *     // ... data to create a Language
     *   }
     * })
     * 
     */
    create<T extends languageCreateArgs>(args: SelectSubset<T, languageCreateArgs<ExtArgs>>): Prisma__languageClient<$Result.GetResult<Prisma.$languagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Languages.
     * @param {languageCreateManyArgs} args - Arguments to create many Languages.
     * @example
     * // Create many Languages
     * const language = await prisma.language.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends languageCreateManyArgs>(args?: SelectSubset<T, languageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Languages and returns the data saved in the database.
     * @param {languageCreateManyAndReturnArgs} args - Arguments to create many Languages.
     * @example
     * // Create many Languages
     * const language = await prisma.language.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Languages and only return the `id`
     * const languageWithIdOnly = await prisma.language.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends languageCreateManyAndReturnArgs>(args?: SelectSubset<T, languageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$languagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Language.
     * @param {languageDeleteArgs} args - Arguments to delete one Language.
     * @example
     * // Delete one Language
     * const Language = await prisma.language.delete({
     *   where: {
     *     // ... filter to delete one Language
     *   }
     * })
     * 
     */
    delete<T extends languageDeleteArgs>(args: SelectSubset<T, languageDeleteArgs<ExtArgs>>): Prisma__languageClient<$Result.GetResult<Prisma.$languagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Language.
     * @param {languageUpdateArgs} args - Arguments to update one Language.
     * @example
     * // Update one Language
     * const language = await prisma.language.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends languageUpdateArgs>(args: SelectSubset<T, languageUpdateArgs<ExtArgs>>): Prisma__languageClient<$Result.GetResult<Prisma.$languagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Languages.
     * @param {languageDeleteManyArgs} args - Arguments to filter Languages to delete.
     * @example
     * // Delete a few Languages
     * const { count } = await prisma.language.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends languageDeleteManyArgs>(args?: SelectSubset<T, languageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Languages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {languageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Languages
     * const language = await prisma.language.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends languageUpdateManyArgs>(args: SelectSubset<T, languageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Language.
     * @param {languageUpsertArgs} args - Arguments to update or create a Language.
     * @example
     * // Update or create a Language
     * const language = await prisma.language.upsert({
     *   create: {
     *     // ... data to create a Language
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Language we want to update
     *   }
     * })
     */
    upsert<T extends languageUpsertArgs>(args: SelectSubset<T, languageUpsertArgs<ExtArgs>>): Prisma__languageClient<$Result.GetResult<Prisma.$languagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Languages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {languageCountArgs} args - Arguments to filter Languages to count.
     * @example
     * // Count the number of Languages
     * const count = await prisma.language.count({
     *   where: {
     *     // ... the filter for the Languages we want to count
     *   }
     * })
    **/
    count<T extends languageCountArgs>(
      args?: Subset<T, languageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LanguageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Language.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LanguageAggregateArgs>(args: Subset<T, LanguageAggregateArgs>): Prisma.PrismaPromise<GetLanguageAggregateType<T>>

    /**
     * Group by Language.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {languageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends languageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: languageGroupByArgs['orderBy'] }
        : { orderBy?: languageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, languageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLanguageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the language model
   */
  readonly fields: languageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for language.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__languageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends language$adminArgs<ExtArgs> = {}>(args?: Subset<T, language$adminArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the language model
   */ 
  interface languageFieldRefs {
    readonly id: FieldRef<"language", 'String'>
    readonly name: FieldRef<"language", 'String'>
    readonly img_path: FieldRef<"language", 'String'>
    readonly admin_id: FieldRef<"language", 'String'>
    readonly created_at: FieldRef<"language", 'DateTime'>
    readonly updated_at: FieldRef<"language", 'DateTime'>
    readonly img_url: FieldRef<"language", 'String'>
  }
    

  // Custom InputTypes
  /**
   * language findUnique
   */
  export type languageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the language
     */
    select?: languageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: languageInclude<ExtArgs> | null
    /**
     * Filter, which language to fetch.
     */
    where: languageWhereUniqueInput
  }

  /**
   * language findUniqueOrThrow
   */
  export type languageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the language
     */
    select?: languageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: languageInclude<ExtArgs> | null
    /**
     * Filter, which language to fetch.
     */
    where: languageWhereUniqueInput
  }

  /**
   * language findFirst
   */
  export type languageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the language
     */
    select?: languageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: languageInclude<ExtArgs> | null
    /**
     * Filter, which language to fetch.
     */
    where?: languageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of languages to fetch.
     */
    orderBy?: languageOrderByWithRelationInput | languageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for languages.
     */
    cursor?: languageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` languages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` languages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of languages.
     */
    distinct?: LanguageScalarFieldEnum | LanguageScalarFieldEnum[]
  }

  /**
   * language findFirstOrThrow
   */
  export type languageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the language
     */
    select?: languageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: languageInclude<ExtArgs> | null
    /**
     * Filter, which language to fetch.
     */
    where?: languageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of languages to fetch.
     */
    orderBy?: languageOrderByWithRelationInput | languageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for languages.
     */
    cursor?: languageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` languages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` languages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of languages.
     */
    distinct?: LanguageScalarFieldEnum | LanguageScalarFieldEnum[]
  }

  /**
   * language findMany
   */
  export type languageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the language
     */
    select?: languageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: languageInclude<ExtArgs> | null
    /**
     * Filter, which languages to fetch.
     */
    where?: languageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of languages to fetch.
     */
    orderBy?: languageOrderByWithRelationInput | languageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing languages.
     */
    cursor?: languageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` languages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` languages.
     */
    skip?: number
    distinct?: LanguageScalarFieldEnum | LanguageScalarFieldEnum[]
  }

  /**
   * language create
   */
  export type languageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the language
     */
    select?: languageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: languageInclude<ExtArgs> | null
    /**
     * The data needed to create a language.
     */
    data: XOR<languageCreateInput, languageUncheckedCreateInput>
  }

  /**
   * language createMany
   */
  export type languageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many languages.
     */
    data: languageCreateManyInput | languageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * language createManyAndReturn
   */
  export type languageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the language
     */
    select?: languageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many languages.
     */
    data: languageCreateManyInput | languageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: languageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * language update
   */
  export type languageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the language
     */
    select?: languageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: languageInclude<ExtArgs> | null
    /**
     * The data needed to update a language.
     */
    data: XOR<languageUpdateInput, languageUncheckedUpdateInput>
    /**
     * Choose, which language to update.
     */
    where: languageWhereUniqueInput
  }

  /**
   * language updateMany
   */
  export type languageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update languages.
     */
    data: XOR<languageUpdateManyMutationInput, languageUncheckedUpdateManyInput>
    /**
     * Filter which languages to update
     */
    where?: languageWhereInput
  }

  /**
   * language upsert
   */
  export type languageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the language
     */
    select?: languageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: languageInclude<ExtArgs> | null
    /**
     * The filter to search for the language to update in case it exists.
     */
    where: languageWhereUniqueInput
    /**
     * In case the language found by the `where` argument doesn't exist, create a new language with this data.
     */
    create: XOR<languageCreateInput, languageUncheckedCreateInput>
    /**
     * In case the language was found with the provided `where` argument, update it with this data.
     */
    update: XOR<languageUpdateInput, languageUncheckedUpdateInput>
  }

  /**
   * language delete
   */
  export type languageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the language
     */
    select?: languageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: languageInclude<ExtArgs> | null
    /**
     * Filter which language to delete.
     */
    where: languageWhereUniqueInput
  }

  /**
   * language deleteMany
   */
  export type languageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which languages to delete
     */
    where?: languageWhereInput
  }

  /**
   * language.admin
   */
  export type language$adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    where?: adminWhereInput
  }

  /**
   * language without action
   */
  export type languageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the language
     */
    select?: languageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: languageInclude<ExtArgs> | null
  }


  /**
   * Model place
   */

  export type AggregatePlace = {
    _count: PlaceCountAggregateOutputType | null
    _min: PlaceMinAggregateOutputType | null
    _max: PlaceMaxAggregateOutputType | null
  }

  export type PlaceMinAggregateOutputType = {
    id: string | null
    name: string | null
    img_path: string | null
    admin_id: string | null
    created_at: Date | null
    updated_at: Date | null
    img_url: string | null
  }

  export type PlaceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    img_path: string | null
    admin_id: string | null
    created_at: Date | null
    updated_at: Date | null
    img_url: string | null
  }

  export type PlaceCountAggregateOutputType = {
    id: number
    name: number
    img_path: number
    admin_id: number
    created_at: number
    updated_at: number
    img_url: number
    _all: number
  }


  export type PlaceMinAggregateInputType = {
    id?: true
    name?: true
    img_path?: true
    admin_id?: true
    created_at?: true
    updated_at?: true
    img_url?: true
  }

  export type PlaceMaxAggregateInputType = {
    id?: true
    name?: true
    img_path?: true
    admin_id?: true
    created_at?: true
    updated_at?: true
    img_url?: true
  }

  export type PlaceCountAggregateInputType = {
    id?: true
    name?: true
    img_path?: true
    admin_id?: true
    created_at?: true
    updated_at?: true
    img_url?: true
    _all?: true
  }

  export type PlaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which place to aggregate.
     */
    where?: placeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of places to fetch.
     */
    orderBy?: placeOrderByWithRelationInput | placeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: placeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` places from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` places.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned places
    **/
    _count?: true | PlaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlaceMaxAggregateInputType
  }

  export type GetPlaceAggregateType<T extends PlaceAggregateArgs> = {
        [P in keyof T & keyof AggregatePlace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlace[P]>
      : GetScalarType<T[P], AggregatePlace[P]>
  }




  export type placeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: placeWhereInput
    orderBy?: placeOrderByWithAggregationInput | placeOrderByWithAggregationInput[]
    by: PlaceScalarFieldEnum[] | PlaceScalarFieldEnum
    having?: placeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlaceCountAggregateInputType | true
    _min?: PlaceMinAggregateInputType
    _max?: PlaceMaxAggregateInputType
  }

  export type PlaceGroupByOutputType = {
    id: string
    name: string
    img_path: string
    admin_id: string | null
    created_at: Date
    updated_at: Date
    img_url: string
    _count: PlaceCountAggregateOutputType | null
    _min: PlaceMinAggregateOutputType | null
    _max: PlaceMaxAggregateOutputType | null
  }

  type GetPlaceGroupByPayload<T extends placeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlaceGroupByOutputType[P]>
            : GetScalarType<T[P], PlaceGroupByOutputType[P]>
        }
      >
    >


  export type placeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    img_path?: boolean
    admin_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    img_url?: boolean
    admin?: boolean | place$adminArgs<ExtArgs>
    user?: boolean | place$userArgs<ExtArgs>
    _count?: boolean | PlaceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["place"]>

  export type placeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    img_path?: boolean
    admin_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    img_url?: boolean
    admin?: boolean | place$adminArgs<ExtArgs>
  }, ExtArgs["result"]["place"]>

  export type placeSelectScalar = {
    id?: boolean
    name?: boolean
    img_path?: boolean
    admin_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    img_url?: boolean
  }

  export type placeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | place$adminArgs<ExtArgs>
    user?: boolean | place$userArgs<ExtArgs>
    _count?: boolean | PlaceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type placeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | place$adminArgs<ExtArgs>
  }

  export type $placePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "place"
    objects: {
      admin: Prisma.$adminPayload<ExtArgs> | null
      user: Prisma.$userPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      img_path: string
      admin_id: string | null
      created_at: Date
      updated_at: Date
      img_url: string
    }, ExtArgs["result"]["place"]>
    composites: {}
  }

  type placeGetPayload<S extends boolean | null | undefined | placeDefaultArgs> = $Result.GetResult<Prisma.$placePayload, S>

  type placeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<placeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlaceCountAggregateInputType | true
    }

  export interface placeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['place'], meta: { name: 'place' } }
    /**
     * Find zero or one Place that matches the filter.
     * @param {placeFindUniqueArgs} args - Arguments to find a Place
     * @example
     * // Get one Place
     * const place = await prisma.place.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends placeFindUniqueArgs>(args: SelectSubset<T, placeFindUniqueArgs<ExtArgs>>): Prisma__placeClient<$Result.GetResult<Prisma.$placePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Place that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {placeFindUniqueOrThrowArgs} args - Arguments to find a Place
     * @example
     * // Get one Place
     * const place = await prisma.place.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends placeFindUniqueOrThrowArgs>(args: SelectSubset<T, placeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__placeClient<$Result.GetResult<Prisma.$placePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Place that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {placeFindFirstArgs} args - Arguments to find a Place
     * @example
     * // Get one Place
     * const place = await prisma.place.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends placeFindFirstArgs>(args?: SelectSubset<T, placeFindFirstArgs<ExtArgs>>): Prisma__placeClient<$Result.GetResult<Prisma.$placePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Place that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {placeFindFirstOrThrowArgs} args - Arguments to find a Place
     * @example
     * // Get one Place
     * const place = await prisma.place.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends placeFindFirstOrThrowArgs>(args?: SelectSubset<T, placeFindFirstOrThrowArgs<ExtArgs>>): Prisma__placeClient<$Result.GetResult<Prisma.$placePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Places that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {placeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Places
     * const places = await prisma.place.findMany()
     * 
     * // Get first 10 Places
     * const places = await prisma.place.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const placeWithIdOnly = await prisma.place.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends placeFindManyArgs>(args?: SelectSubset<T, placeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$placePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Place.
     * @param {placeCreateArgs} args - Arguments to create a Place.
     * @example
     * // Create one Place
     * const Place = await prisma.place.create({
     *   data: {
     *     // ... data to create a Place
     *   }
     * })
     * 
     */
    create<T extends placeCreateArgs>(args: SelectSubset<T, placeCreateArgs<ExtArgs>>): Prisma__placeClient<$Result.GetResult<Prisma.$placePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Places.
     * @param {placeCreateManyArgs} args - Arguments to create many Places.
     * @example
     * // Create many Places
     * const place = await prisma.place.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends placeCreateManyArgs>(args?: SelectSubset<T, placeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Places and returns the data saved in the database.
     * @param {placeCreateManyAndReturnArgs} args - Arguments to create many Places.
     * @example
     * // Create many Places
     * const place = await prisma.place.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Places and only return the `id`
     * const placeWithIdOnly = await prisma.place.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends placeCreateManyAndReturnArgs>(args?: SelectSubset<T, placeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$placePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Place.
     * @param {placeDeleteArgs} args - Arguments to delete one Place.
     * @example
     * // Delete one Place
     * const Place = await prisma.place.delete({
     *   where: {
     *     // ... filter to delete one Place
     *   }
     * })
     * 
     */
    delete<T extends placeDeleteArgs>(args: SelectSubset<T, placeDeleteArgs<ExtArgs>>): Prisma__placeClient<$Result.GetResult<Prisma.$placePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Place.
     * @param {placeUpdateArgs} args - Arguments to update one Place.
     * @example
     * // Update one Place
     * const place = await prisma.place.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends placeUpdateArgs>(args: SelectSubset<T, placeUpdateArgs<ExtArgs>>): Prisma__placeClient<$Result.GetResult<Prisma.$placePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Places.
     * @param {placeDeleteManyArgs} args - Arguments to filter Places to delete.
     * @example
     * // Delete a few Places
     * const { count } = await prisma.place.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends placeDeleteManyArgs>(args?: SelectSubset<T, placeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Places.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {placeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Places
     * const place = await prisma.place.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends placeUpdateManyArgs>(args: SelectSubset<T, placeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Place.
     * @param {placeUpsertArgs} args - Arguments to update or create a Place.
     * @example
     * // Update or create a Place
     * const place = await prisma.place.upsert({
     *   create: {
     *     // ... data to create a Place
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Place we want to update
     *   }
     * })
     */
    upsert<T extends placeUpsertArgs>(args: SelectSubset<T, placeUpsertArgs<ExtArgs>>): Prisma__placeClient<$Result.GetResult<Prisma.$placePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Places.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {placeCountArgs} args - Arguments to filter Places to count.
     * @example
     * // Count the number of Places
     * const count = await prisma.place.count({
     *   where: {
     *     // ... the filter for the Places we want to count
     *   }
     * })
    **/
    count<T extends placeCountArgs>(
      args?: Subset<T, placeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Place.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlaceAggregateArgs>(args: Subset<T, PlaceAggregateArgs>): Prisma.PrismaPromise<GetPlaceAggregateType<T>>

    /**
     * Group by Place.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {placeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends placeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: placeGroupByArgs['orderBy'] }
        : { orderBy?: placeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, placeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the place model
   */
  readonly fields: placeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for place.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__placeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends place$adminArgs<ExtArgs> = {}>(args?: Subset<T, place$adminArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    user<T extends place$userArgs<ExtArgs> = {}>(args?: Subset<T, place$userArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the place model
   */ 
  interface placeFieldRefs {
    readonly id: FieldRef<"place", 'String'>
    readonly name: FieldRef<"place", 'String'>
    readonly img_path: FieldRef<"place", 'String'>
    readonly admin_id: FieldRef<"place", 'String'>
    readonly created_at: FieldRef<"place", 'DateTime'>
    readonly updated_at: FieldRef<"place", 'DateTime'>
    readonly img_url: FieldRef<"place", 'String'>
  }
    

  // Custom InputTypes
  /**
   * place findUnique
   */
  export type placeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the place
     */
    select?: placeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placeInclude<ExtArgs> | null
    /**
     * Filter, which place to fetch.
     */
    where: placeWhereUniqueInput
  }

  /**
   * place findUniqueOrThrow
   */
  export type placeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the place
     */
    select?: placeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placeInclude<ExtArgs> | null
    /**
     * Filter, which place to fetch.
     */
    where: placeWhereUniqueInput
  }

  /**
   * place findFirst
   */
  export type placeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the place
     */
    select?: placeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placeInclude<ExtArgs> | null
    /**
     * Filter, which place to fetch.
     */
    where?: placeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of places to fetch.
     */
    orderBy?: placeOrderByWithRelationInput | placeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for places.
     */
    cursor?: placeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` places from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` places.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of places.
     */
    distinct?: PlaceScalarFieldEnum | PlaceScalarFieldEnum[]
  }

  /**
   * place findFirstOrThrow
   */
  export type placeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the place
     */
    select?: placeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placeInclude<ExtArgs> | null
    /**
     * Filter, which place to fetch.
     */
    where?: placeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of places to fetch.
     */
    orderBy?: placeOrderByWithRelationInput | placeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for places.
     */
    cursor?: placeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` places from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` places.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of places.
     */
    distinct?: PlaceScalarFieldEnum | PlaceScalarFieldEnum[]
  }

  /**
   * place findMany
   */
  export type placeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the place
     */
    select?: placeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placeInclude<ExtArgs> | null
    /**
     * Filter, which places to fetch.
     */
    where?: placeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of places to fetch.
     */
    orderBy?: placeOrderByWithRelationInput | placeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing places.
     */
    cursor?: placeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` places from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` places.
     */
    skip?: number
    distinct?: PlaceScalarFieldEnum | PlaceScalarFieldEnum[]
  }

  /**
   * place create
   */
  export type placeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the place
     */
    select?: placeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placeInclude<ExtArgs> | null
    /**
     * The data needed to create a place.
     */
    data: XOR<placeCreateInput, placeUncheckedCreateInput>
  }

  /**
   * place createMany
   */
  export type placeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many places.
     */
    data: placeCreateManyInput | placeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * place createManyAndReturn
   */
  export type placeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the place
     */
    select?: placeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many places.
     */
    data: placeCreateManyInput | placeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * place update
   */
  export type placeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the place
     */
    select?: placeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placeInclude<ExtArgs> | null
    /**
     * The data needed to update a place.
     */
    data: XOR<placeUpdateInput, placeUncheckedUpdateInput>
    /**
     * Choose, which place to update.
     */
    where: placeWhereUniqueInput
  }

  /**
   * place updateMany
   */
  export type placeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update places.
     */
    data: XOR<placeUpdateManyMutationInput, placeUncheckedUpdateManyInput>
    /**
     * Filter which places to update
     */
    where?: placeWhereInput
  }

  /**
   * place upsert
   */
  export type placeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the place
     */
    select?: placeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placeInclude<ExtArgs> | null
    /**
     * The filter to search for the place to update in case it exists.
     */
    where: placeWhereUniqueInput
    /**
     * In case the place found by the `where` argument doesn't exist, create a new place with this data.
     */
    create: XOR<placeCreateInput, placeUncheckedCreateInput>
    /**
     * In case the place was found with the provided `where` argument, update it with this data.
     */
    update: XOR<placeUpdateInput, placeUncheckedUpdateInput>
  }

  /**
   * place delete
   */
  export type placeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the place
     */
    select?: placeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placeInclude<ExtArgs> | null
    /**
     * Filter which place to delete.
     */
    where: placeWhereUniqueInput
  }

  /**
   * place deleteMany
   */
  export type placeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which places to delete
     */
    where?: placeWhereInput
  }

  /**
   * place.admin
   */
  export type place$adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    where?: adminWhereInput
  }

  /**
   * place.user
   */
  export type place$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    where?: userWhereInput
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    cursor?: userWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * place without action
   */
  export type placeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the place
     */
    select?: placeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placeInclude<ExtArgs> | null
  }


  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    username: string | null
    password: string | null
    place_id: string | null
    admin_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    username: string | null
    password: string | null
    place_id: string | null
    admin_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    username: number
    password: number
    place_id: number
    admin_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    username?: true
    password?: true
    place_id?: true
    admin_id?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    username?: true
    password?: true
    place_id?: true
    admin_id?: true
    created_at?: true
    updated_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    username?: true
    password?: true
    place_id?: true
    admin_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    username: string
    password: string
    place_id: string | null
    admin_id: string | null
    created_at: Date
    updated_at: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    username?: boolean
    password?: boolean
    place_id?: boolean
    admin_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    admin?: boolean | user$adminArgs<ExtArgs>
    place?: boolean | user$placeArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type userSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    username?: boolean
    password?: boolean
    place_id?: boolean
    admin_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    admin?: boolean | user$adminArgs<ExtArgs>
    place?: boolean | user$placeArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type userSelectScalar = {
    id?: boolean
    name?: boolean
    username?: boolean
    password?: boolean
    place_id?: boolean
    admin_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type userInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | user$adminArgs<ExtArgs>
    place?: boolean | user$placeArgs<ExtArgs>
  }
  export type userIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | user$adminArgs<ExtArgs>
    place?: boolean | user$placeArgs<ExtArgs>
  }

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {
      admin: Prisma.$adminPayload<ExtArgs> | null
      place: Prisma.$placePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      username: string
      password: string
      place_id: string | null
      admin_id: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {userCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends userCreateManyAndReturnArgs>(args?: SelectSubset<T, userCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends user$adminArgs<ExtArgs> = {}>(args?: Subset<T, user$adminArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    place<T extends user$placeArgs<ExtArgs> = {}>(args?: Subset<T, user$placeArgs<ExtArgs>>): Prisma__placeClient<$Result.GetResult<Prisma.$placePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user model
   */ 
  interface userFieldRefs {
    readonly id: FieldRef<"user", 'String'>
    readonly name: FieldRef<"user", 'String'>
    readonly username: FieldRef<"user", 'String'>
    readonly password: FieldRef<"user", 'String'>
    readonly place_id: FieldRef<"user", 'String'>
    readonly admin_id: FieldRef<"user", 'String'>
    readonly created_at: FieldRef<"user", 'DateTime'>
    readonly updated_at: FieldRef<"user", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user createManyAndReturn
   */
  export type userCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
  }

  /**
   * user.admin
   */
  export type user$adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    where?: adminWhereInput
  }

  /**
   * user.place
   */
  export type user$placeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the place
     */
    select?: placeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placeInclude<ExtArgs> | null
    where?: placeWhereInput
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AdminScalarFieldEnum: {
    id: 'id',
    name: 'name',
    username: 'username',
    password: 'password',
    created_at: 'created_at',
    updated_at: 'updated_at',
    roles: 'roles'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const AudioScalarFieldEnum: {
    img_path: 'img_path',
    place_id: 'place_id',
    language_id: 'language_id',
    admin_id: 'admin_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    file_path: 'file_path',
    file_url: 'file_url',
    img_url: 'img_url',
    id: 'id'
  };

  export type AudioScalarFieldEnum = (typeof AudioScalarFieldEnum)[keyof typeof AudioScalarFieldEnum]


  export const LanguageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    img_path: 'img_path',
    admin_id: 'admin_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    img_url: 'img_url'
  };

  export type LanguageScalarFieldEnum = (typeof LanguageScalarFieldEnum)[keyof typeof LanguageScalarFieldEnum]


  export const PlaceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    img_path: 'img_path',
    admin_id: 'admin_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    img_url: 'img_url'
  };

  export type PlaceScalarFieldEnum = (typeof PlaceScalarFieldEnum)[keyof typeof PlaceScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    username: 'username',
    password: 'password',
    place_id: 'place_id',
    admin_id: 'admin_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'AdminRoles[]'
   */
  export type ListEnumAdminRolesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdminRoles[]'>
    


  /**
   * Reference to a field of type 'AdminRoles'
   */
  export type EnumAdminRolesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdminRoles'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type adminWhereInput = {
    AND?: adminWhereInput | adminWhereInput[]
    OR?: adminWhereInput[]
    NOT?: adminWhereInput | adminWhereInput[]
    id?: StringFilter<"admin"> | string
    name?: StringFilter<"admin"> | string
    username?: StringFilter<"admin"> | string
    password?: StringFilter<"admin"> | string
    created_at?: DateTimeFilter<"admin"> | Date | string
    updated_at?: DateTimeFilter<"admin"> | Date | string
    roles?: EnumAdminRolesNullableListFilter<"admin">
    audio?: AudioListRelationFilter
    language?: LanguageListRelationFilter
    place?: PlaceListRelationFilter
    user?: UserListRelationFilter
  }

  export type adminOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    roles?: SortOrder
    audio?: audioOrderByRelationAggregateInput
    language?: languageOrderByRelationAggregateInput
    place?: placeOrderByRelationAggregateInput
    user?: userOrderByRelationAggregateInput
  }

  export type adminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: adminWhereInput | adminWhereInput[]
    OR?: adminWhereInput[]
    NOT?: adminWhereInput | adminWhereInput[]
    name?: StringFilter<"admin"> | string
    password?: StringFilter<"admin"> | string
    created_at?: DateTimeFilter<"admin"> | Date | string
    updated_at?: DateTimeFilter<"admin"> | Date | string
    roles?: EnumAdminRolesNullableListFilter<"admin">
    audio?: AudioListRelationFilter
    language?: LanguageListRelationFilter
    place?: PlaceListRelationFilter
    user?: UserListRelationFilter
  }, "id" | "username">

  export type adminOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    roles?: SortOrder
    _count?: adminCountOrderByAggregateInput
    _max?: adminMaxOrderByAggregateInput
    _min?: adminMinOrderByAggregateInput
  }

  export type adminScalarWhereWithAggregatesInput = {
    AND?: adminScalarWhereWithAggregatesInput | adminScalarWhereWithAggregatesInput[]
    OR?: adminScalarWhereWithAggregatesInput[]
    NOT?: adminScalarWhereWithAggregatesInput | adminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"admin"> | string
    name?: StringWithAggregatesFilter<"admin"> | string
    username?: StringWithAggregatesFilter<"admin"> | string
    password?: StringWithAggregatesFilter<"admin"> | string
    created_at?: DateTimeWithAggregatesFilter<"admin"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"admin"> | Date | string
    roles?: EnumAdminRolesNullableListFilter<"admin">
  }

  export type audioWhereInput = {
    AND?: audioWhereInput | audioWhereInput[]
    OR?: audioWhereInput[]
    NOT?: audioWhereInput | audioWhereInput[]
    img_path?: StringNullableListFilter<"audio">
    place_id?: StringFilter<"audio"> | string
    language_id?: StringFilter<"audio"> | string
    admin_id?: StringNullableFilter<"audio"> | string | null
    created_at?: DateTimeFilter<"audio"> | Date | string
    updated_at?: DateTimeFilter<"audio"> | Date | string
    file_path?: StringFilter<"audio"> | string
    file_url?: StringFilter<"audio"> | string
    img_url?: StringNullableListFilter<"audio">
    id?: StringFilter<"audio"> | string
    admin?: XOR<AdminNullableRelationFilter, adminWhereInput> | null
  }

  export type audioOrderByWithRelationInput = {
    img_path?: SortOrder
    place_id?: SortOrder
    language_id?: SortOrder
    admin_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_path?: SortOrder
    file_url?: SortOrder
    img_url?: SortOrder
    id?: SortOrder
    admin?: adminOrderByWithRelationInput
  }

  export type audioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    place_id_language_id?: audioPlace_idLanguage_idCompoundUniqueInput
    AND?: audioWhereInput | audioWhereInput[]
    OR?: audioWhereInput[]
    NOT?: audioWhereInput | audioWhereInput[]
    img_path?: StringNullableListFilter<"audio">
    place_id?: StringFilter<"audio"> | string
    language_id?: StringFilter<"audio"> | string
    admin_id?: StringNullableFilter<"audio"> | string | null
    created_at?: DateTimeFilter<"audio"> | Date | string
    updated_at?: DateTimeFilter<"audio"> | Date | string
    file_path?: StringFilter<"audio"> | string
    file_url?: StringFilter<"audio"> | string
    img_url?: StringNullableListFilter<"audio">
    admin?: XOR<AdminNullableRelationFilter, adminWhereInput> | null
  }, "place_id_language_id" | "id">

  export type audioOrderByWithAggregationInput = {
    img_path?: SortOrder
    place_id?: SortOrder
    language_id?: SortOrder
    admin_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_path?: SortOrder
    file_url?: SortOrder
    img_url?: SortOrder
    id?: SortOrder
    _count?: audioCountOrderByAggregateInput
    _max?: audioMaxOrderByAggregateInput
    _min?: audioMinOrderByAggregateInput
  }

  export type audioScalarWhereWithAggregatesInput = {
    AND?: audioScalarWhereWithAggregatesInput | audioScalarWhereWithAggregatesInput[]
    OR?: audioScalarWhereWithAggregatesInput[]
    NOT?: audioScalarWhereWithAggregatesInput | audioScalarWhereWithAggregatesInput[]
    img_path?: StringNullableListFilter<"audio">
    place_id?: StringWithAggregatesFilter<"audio"> | string
    language_id?: StringWithAggregatesFilter<"audio"> | string
    admin_id?: StringNullableWithAggregatesFilter<"audio"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"audio"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"audio"> | Date | string
    file_path?: StringWithAggregatesFilter<"audio"> | string
    file_url?: StringWithAggregatesFilter<"audio"> | string
    img_url?: StringNullableListFilter<"audio">
    id?: StringWithAggregatesFilter<"audio"> | string
  }

  export type languageWhereInput = {
    AND?: languageWhereInput | languageWhereInput[]
    OR?: languageWhereInput[]
    NOT?: languageWhereInput | languageWhereInput[]
    id?: StringFilter<"language"> | string
    name?: StringFilter<"language"> | string
    img_path?: StringFilter<"language"> | string
    admin_id?: StringNullableFilter<"language"> | string | null
    created_at?: DateTimeFilter<"language"> | Date | string
    updated_at?: DateTimeFilter<"language"> | Date | string
    img_url?: StringFilter<"language"> | string
    admin?: XOR<AdminNullableRelationFilter, adminWhereInput> | null
  }

  export type languageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    img_path?: SortOrder
    admin_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    img_url?: SortOrder
    admin?: adminOrderByWithRelationInput
  }

  export type languageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: languageWhereInput | languageWhereInput[]
    OR?: languageWhereInput[]
    NOT?: languageWhereInput | languageWhereInput[]
    img_path?: StringFilter<"language"> | string
    admin_id?: StringNullableFilter<"language"> | string | null
    created_at?: DateTimeFilter<"language"> | Date | string
    updated_at?: DateTimeFilter<"language"> | Date | string
    img_url?: StringFilter<"language"> | string
    admin?: XOR<AdminNullableRelationFilter, adminWhereInput> | null
  }, "id" | "name">

  export type languageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    img_path?: SortOrder
    admin_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    img_url?: SortOrder
    _count?: languageCountOrderByAggregateInput
    _max?: languageMaxOrderByAggregateInput
    _min?: languageMinOrderByAggregateInput
  }

  export type languageScalarWhereWithAggregatesInput = {
    AND?: languageScalarWhereWithAggregatesInput | languageScalarWhereWithAggregatesInput[]
    OR?: languageScalarWhereWithAggregatesInput[]
    NOT?: languageScalarWhereWithAggregatesInput | languageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"language"> | string
    name?: StringWithAggregatesFilter<"language"> | string
    img_path?: StringWithAggregatesFilter<"language"> | string
    admin_id?: StringNullableWithAggregatesFilter<"language"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"language"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"language"> | Date | string
    img_url?: StringWithAggregatesFilter<"language"> | string
  }

  export type placeWhereInput = {
    AND?: placeWhereInput | placeWhereInput[]
    OR?: placeWhereInput[]
    NOT?: placeWhereInput | placeWhereInput[]
    id?: StringFilter<"place"> | string
    name?: StringFilter<"place"> | string
    img_path?: StringFilter<"place"> | string
    admin_id?: StringNullableFilter<"place"> | string | null
    created_at?: DateTimeFilter<"place"> | Date | string
    updated_at?: DateTimeFilter<"place"> | Date | string
    img_url?: StringFilter<"place"> | string
    admin?: XOR<AdminNullableRelationFilter, adminWhereInput> | null
    user?: UserListRelationFilter
  }

  export type placeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    img_path?: SortOrder
    admin_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    img_url?: SortOrder
    admin?: adminOrderByWithRelationInput
    user?: userOrderByRelationAggregateInput
  }

  export type placeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: placeWhereInput | placeWhereInput[]
    OR?: placeWhereInput[]
    NOT?: placeWhereInput | placeWhereInput[]
    img_path?: StringFilter<"place"> | string
    admin_id?: StringNullableFilter<"place"> | string | null
    created_at?: DateTimeFilter<"place"> | Date | string
    updated_at?: DateTimeFilter<"place"> | Date | string
    img_url?: StringFilter<"place"> | string
    admin?: XOR<AdminNullableRelationFilter, adminWhereInput> | null
    user?: UserListRelationFilter
  }, "id" | "name">

  export type placeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    img_path?: SortOrder
    admin_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    img_url?: SortOrder
    _count?: placeCountOrderByAggregateInput
    _max?: placeMaxOrderByAggregateInput
    _min?: placeMinOrderByAggregateInput
  }

  export type placeScalarWhereWithAggregatesInput = {
    AND?: placeScalarWhereWithAggregatesInput | placeScalarWhereWithAggregatesInput[]
    OR?: placeScalarWhereWithAggregatesInput[]
    NOT?: placeScalarWhereWithAggregatesInput | placeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"place"> | string
    name?: StringWithAggregatesFilter<"place"> | string
    img_path?: StringWithAggregatesFilter<"place"> | string
    admin_id?: StringNullableWithAggregatesFilter<"place"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"place"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"place"> | Date | string
    img_url?: StringWithAggregatesFilter<"place"> | string
  }

  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    id?: StringFilter<"user"> | string
    name?: StringFilter<"user"> | string
    username?: StringFilter<"user"> | string
    password?: StringFilter<"user"> | string
    place_id?: StringNullableFilter<"user"> | string | null
    admin_id?: StringNullableFilter<"user"> | string | null
    created_at?: DateTimeFilter<"user"> | Date | string
    updated_at?: DateTimeFilter<"user"> | Date | string
    admin?: XOR<AdminNullableRelationFilter, adminWhereInput> | null
    place?: XOR<PlaceNullableRelationFilter, placeWhereInput> | null
  }

  export type userOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    place_id?: SortOrderInput | SortOrder
    admin_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    admin?: adminOrderByWithRelationInput
    place?: placeOrderByWithRelationInput
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    name?: StringFilter<"user"> | string
    password?: StringFilter<"user"> | string
    place_id?: StringNullableFilter<"user"> | string | null
    admin_id?: StringNullableFilter<"user"> | string | null
    created_at?: DateTimeFilter<"user"> | Date | string
    updated_at?: DateTimeFilter<"user"> | Date | string
    admin?: XOR<AdminNullableRelationFilter, adminWhereInput> | null
    place?: XOR<PlaceNullableRelationFilter, placeWhereInput> | null
  }, "id" | "username">

  export type userOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    place_id?: SortOrderInput | SortOrder
    admin_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: userCountOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"user"> | string
    name?: StringWithAggregatesFilter<"user"> | string
    username?: StringWithAggregatesFilter<"user"> | string
    password?: StringWithAggregatesFilter<"user"> | string
    place_id?: StringNullableWithAggregatesFilter<"user"> | string | null
    admin_id?: StringNullableWithAggregatesFilter<"user"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"user"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"user"> | Date | string
  }

  export type adminCreateInput = {
    id: string
    name: string
    username: string
    password: string
    created_at?: Date | string
    updated_at: Date | string
    roles?: adminCreaterolesInput | $Enums.AdminRoles[]
    audio?: audioCreateNestedManyWithoutAdminInput
    language?: languageCreateNestedManyWithoutAdminInput
    place?: placeCreateNestedManyWithoutAdminInput
    user?: userCreateNestedManyWithoutAdminInput
  }

  export type adminUncheckedCreateInput = {
    id: string
    name: string
    username: string
    password: string
    created_at?: Date | string
    updated_at: Date | string
    roles?: adminCreaterolesInput | $Enums.AdminRoles[]
    audio?: audioUncheckedCreateNestedManyWithoutAdminInput
    language?: languageUncheckedCreateNestedManyWithoutAdminInput
    place?: placeUncheckedCreateNestedManyWithoutAdminInput
    user?: userUncheckedCreateNestedManyWithoutAdminInput
  }

  export type adminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: adminUpdaterolesInput | $Enums.AdminRoles[]
    audio?: audioUpdateManyWithoutAdminNestedInput
    language?: languageUpdateManyWithoutAdminNestedInput
    place?: placeUpdateManyWithoutAdminNestedInput
    user?: userUpdateManyWithoutAdminNestedInput
  }

  export type adminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: adminUpdaterolesInput | $Enums.AdminRoles[]
    audio?: audioUncheckedUpdateManyWithoutAdminNestedInput
    language?: languageUncheckedUpdateManyWithoutAdminNestedInput
    place?: placeUncheckedUpdateManyWithoutAdminNestedInput
    user?: userUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type adminCreateManyInput = {
    id: string
    name: string
    username: string
    password: string
    created_at?: Date | string
    updated_at: Date | string
    roles?: adminCreaterolesInput | $Enums.AdminRoles[]
  }

  export type adminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: adminUpdaterolesInput | $Enums.AdminRoles[]
  }

  export type adminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: adminUpdaterolesInput | $Enums.AdminRoles[]
  }

  export type audioCreateInput = {
    img_path?: audioCreateimg_pathInput | string[]
    place_id: string
    language_id: string
    created_at?: Date | string
    updated_at: Date | string
    file_path: string
    file_url: string
    img_url?: audioCreateimg_urlInput | string[]
    id: string
    admin?: adminCreateNestedOneWithoutAudioInput
  }

  export type audioUncheckedCreateInput = {
    img_path?: audioCreateimg_pathInput | string[]
    place_id: string
    language_id: string
    admin_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
    file_path: string
    file_url: string
    img_url?: audioCreateimg_urlInput | string[]
    id: string
  }

  export type audioUpdateInput = {
    img_path?: audioUpdateimg_pathInput | string[]
    place_id?: StringFieldUpdateOperationsInput | string
    language_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    img_url?: audioUpdateimg_urlInput | string[]
    id?: StringFieldUpdateOperationsInput | string
    admin?: adminUpdateOneWithoutAudioNestedInput
  }

  export type audioUncheckedUpdateInput = {
    img_path?: audioUpdateimg_pathInput | string[]
    place_id?: StringFieldUpdateOperationsInput | string
    language_id?: StringFieldUpdateOperationsInput | string
    admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    img_url?: audioUpdateimg_urlInput | string[]
    id?: StringFieldUpdateOperationsInput | string
  }

  export type audioCreateManyInput = {
    img_path?: audioCreateimg_pathInput | string[]
    place_id: string
    language_id: string
    admin_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
    file_path: string
    file_url: string
    img_url?: audioCreateimg_urlInput | string[]
    id: string
  }

  export type audioUpdateManyMutationInput = {
    img_path?: audioUpdateimg_pathInput | string[]
    place_id?: StringFieldUpdateOperationsInput | string
    language_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    img_url?: audioUpdateimg_urlInput | string[]
    id?: StringFieldUpdateOperationsInput | string
  }

  export type audioUncheckedUpdateManyInput = {
    img_path?: audioUpdateimg_pathInput | string[]
    place_id?: StringFieldUpdateOperationsInput | string
    language_id?: StringFieldUpdateOperationsInput | string
    admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    img_url?: audioUpdateimg_urlInput | string[]
    id?: StringFieldUpdateOperationsInput | string
  }

  export type languageCreateInput = {
    id: string
    name: string
    img_path: string
    created_at?: Date | string
    updated_at: Date | string
    img_url: string
    admin?: adminCreateNestedOneWithoutLanguageInput
  }

  export type languageUncheckedCreateInput = {
    id: string
    name: string
    img_path: string
    admin_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
    img_url: string
  }

  export type languageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    img_path?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    img_url?: StringFieldUpdateOperationsInput | string
    admin?: adminUpdateOneWithoutLanguageNestedInput
  }

  export type languageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    img_path?: StringFieldUpdateOperationsInput | string
    admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    img_url?: StringFieldUpdateOperationsInput | string
  }

  export type languageCreateManyInput = {
    id: string
    name: string
    img_path: string
    admin_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
    img_url: string
  }

  export type languageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    img_path?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    img_url?: StringFieldUpdateOperationsInput | string
  }

  export type languageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    img_path?: StringFieldUpdateOperationsInput | string
    admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    img_url?: StringFieldUpdateOperationsInput | string
  }

  export type placeCreateInput = {
    id: string
    name: string
    img_path: string
    created_at?: Date | string
    updated_at: Date | string
    img_url: string
    admin?: adminCreateNestedOneWithoutPlaceInput
    user?: userCreateNestedManyWithoutPlaceInput
  }

  export type placeUncheckedCreateInput = {
    id: string
    name: string
    img_path: string
    admin_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
    img_url: string
    user?: userUncheckedCreateNestedManyWithoutPlaceInput
  }

  export type placeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    img_path?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    img_url?: StringFieldUpdateOperationsInput | string
    admin?: adminUpdateOneWithoutPlaceNestedInput
    user?: userUpdateManyWithoutPlaceNestedInput
  }

  export type placeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    img_path?: StringFieldUpdateOperationsInput | string
    admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    img_url?: StringFieldUpdateOperationsInput | string
    user?: userUncheckedUpdateManyWithoutPlaceNestedInput
  }

  export type placeCreateManyInput = {
    id: string
    name: string
    img_path: string
    admin_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
    img_url: string
  }

  export type placeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    img_path?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    img_url?: StringFieldUpdateOperationsInput | string
  }

  export type placeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    img_path?: StringFieldUpdateOperationsInput | string
    admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    img_url?: StringFieldUpdateOperationsInput | string
  }

  export type userCreateInput = {
    id: string
    name: string
    username: string
    password: string
    created_at?: Date | string
    updated_at: Date | string
    admin?: adminCreateNestedOneWithoutUserInput
    place?: placeCreateNestedOneWithoutUserInput
  }

  export type userUncheckedCreateInput = {
    id: string
    name: string
    username: string
    password: string
    place_id?: string | null
    admin_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type userUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: adminUpdateOneWithoutUserNestedInput
    place?: placeUpdateOneWithoutUserNestedInput
  }

  export type userUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    place_id?: NullableStringFieldUpdateOperationsInput | string | null
    admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userCreateManyInput = {
    id: string
    name: string
    username: string
    password: string
    place_id?: string | null
    admin_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type userUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    place_id?: NullableStringFieldUpdateOperationsInput | string | null
    admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumAdminRolesNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRoles[] | ListEnumAdminRolesFieldRefInput<$PrismaModel> | null
    has?: $Enums.AdminRoles | EnumAdminRolesFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.AdminRoles[] | ListEnumAdminRolesFieldRefInput<$PrismaModel>
    hasSome?: $Enums.AdminRoles[] | ListEnumAdminRolesFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type AudioListRelationFilter = {
    every?: audioWhereInput
    some?: audioWhereInput
    none?: audioWhereInput
  }

  export type LanguageListRelationFilter = {
    every?: languageWhereInput
    some?: languageWhereInput
    none?: languageWhereInput
  }

  export type PlaceListRelationFilter = {
    every?: placeWhereInput
    some?: placeWhereInput
    none?: placeWhereInput
  }

  export type UserListRelationFilter = {
    every?: userWhereInput
    some?: userWhereInput
    none?: userWhereInput
  }

  export type audioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type languageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type placeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type userOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type adminCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    roles?: SortOrder
  }

  export type adminMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type adminMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type AdminNullableRelationFilter = {
    is?: adminWhereInput | null
    isNot?: adminWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type audioPlace_idLanguage_idCompoundUniqueInput = {
    place_id: string
    language_id: string
  }

  export type audioCountOrderByAggregateInput = {
    img_path?: SortOrder
    place_id?: SortOrder
    language_id?: SortOrder
    admin_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_path?: SortOrder
    file_url?: SortOrder
    img_url?: SortOrder
    id?: SortOrder
  }

  export type audioMaxOrderByAggregateInput = {
    place_id?: SortOrder
    language_id?: SortOrder
    admin_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_path?: SortOrder
    file_url?: SortOrder
    id?: SortOrder
  }

  export type audioMinOrderByAggregateInput = {
    place_id?: SortOrder
    language_id?: SortOrder
    admin_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_path?: SortOrder
    file_url?: SortOrder
    id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type languageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    img_path?: SortOrder
    admin_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    img_url?: SortOrder
  }

  export type languageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    img_path?: SortOrder
    admin_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    img_url?: SortOrder
  }

  export type languageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    img_path?: SortOrder
    admin_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    img_url?: SortOrder
  }

  export type placeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    img_path?: SortOrder
    admin_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    img_url?: SortOrder
  }

  export type placeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    img_path?: SortOrder
    admin_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    img_url?: SortOrder
  }

  export type placeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    img_path?: SortOrder
    admin_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    img_url?: SortOrder
  }

  export type PlaceNullableRelationFilter = {
    is?: placeWhereInput | null
    isNot?: placeWhereInput | null
  }

  export type userCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    place_id?: SortOrder
    admin_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    place_id?: SortOrder
    admin_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    place_id?: SortOrder
    admin_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type adminCreaterolesInput = {
    set: $Enums.AdminRoles[]
  }

  export type audioCreateNestedManyWithoutAdminInput = {
    create?: XOR<audioCreateWithoutAdminInput, audioUncheckedCreateWithoutAdminInput> | audioCreateWithoutAdminInput[] | audioUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: audioCreateOrConnectWithoutAdminInput | audioCreateOrConnectWithoutAdminInput[]
    createMany?: audioCreateManyAdminInputEnvelope
    connect?: audioWhereUniqueInput | audioWhereUniqueInput[]
  }

  export type languageCreateNestedManyWithoutAdminInput = {
    create?: XOR<languageCreateWithoutAdminInput, languageUncheckedCreateWithoutAdminInput> | languageCreateWithoutAdminInput[] | languageUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: languageCreateOrConnectWithoutAdminInput | languageCreateOrConnectWithoutAdminInput[]
    createMany?: languageCreateManyAdminInputEnvelope
    connect?: languageWhereUniqueInput | languageWhereUniqueInput[]
  }

  export type placeCreateNestedManyWithoutAdminInput = {
    create?: XOR<placeCreateWithoutAdminInput, placeUncheckedCreateWithoutAdminInput> | placeCreateWithoutAdminInput[] | placeUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: placeCreateOrConnectWithoutAdminInput | placeCreateOrConnectWithoutAdminInput[]
    createMany?: placeCreateManyAdminInputEnvelope
    connect?: placeWhereUniqueInput | placeWhereUniqueInput[]
  }

  export type userCreateNestedManyWithoutAdminInput = {
    create?: XOR<userCreateWithoutAdminInput, userUncheckedCreateWithoutAdminInput> | userCreateWithoutAdminInput[] | userUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: userCreateOrConnectWithoutAdminInput | userCreateOrConnectWithoutAdminInput[]
    createMany?: userCreateManyAdminInputEnvelope
    connect?: userWhereUniqueInput | userWhereUniqueInput[]
  }

  export type audioUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<audioCreateWithoutAdminInput, audioUncheckedCreateWithoutAdminInput> | audioCreateWithoutAdminInput[] | audioUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: audioCreateOrConnectWithoutAdminInput | audioCreateOrConnectWithoutAdminInput[]
    createMany?: audioCreateManyAdminInputEnvelope
    connect?: audioWhereUniqueInput | audioWhereUniqueInput[]
  }

  export type languageUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<languageCreateWithoutAdminInput, languageUncheckedCreateWithoutAdminInput> | languageCreateWithoutAdminInput[] | languageUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: languageCreateOrConnectWithoutAdminInput | languageCreateOrConnectWithoutAdminInput[]
    createMany?: languageCreateManyAdminInputEnvelope
    connect?: languageWhereUniqueInput | languageWhereUniqueInput[]
  }

  export type placeUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<placeCreateWithoutAdminInput, placeUncheckedCreateWithoutAdminInput> | placeCreateWithoutAdminInput[] | placeUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: placeCreateOrConnectWithoutAdminInput | placeCreateOrConnectWithoutAdminInput[]
    createMany?: placeCreateManyAdminInputEnvelope
    connect?: placeWhereUniqueInput | placeWhereUniqueInput[]
  }

  export type userUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<userCreateWithoutAdminInput, userUncheckedCreateWithoutAdminInput> | userCreateWithoutAdminInput[] | userUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: userCreateOrConnectWithoutAdminInput | userCreateOrConnectWithoutAdminInput[]
    createMany?: userCreateManyAdminInputEnvelope
    connect?: userWhereUniqueInput | userWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type adminUpdaterolesInput = {
    set?: $Enums.AdminRoles[]
    push?: $Enums.AdminRoles | $Enums.AdminRoles[]
  }

  export type audioUpdateManyWithoutAdminNestedInput = {
    create?: XOR<audioCreateWithoutAdminInput, audioUncheckedCreateWithoutAdminInput> | audioCreateWithoutAdminInput[] | audioUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: audioCreateOrConnectWithoutAdminInput | audioCreateOrConnectWithoutAdminInput[]
    upsert?: audioUpsertWithWhereUniqueWithoutAdminInput | audioUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: audioCreateManyAdminInputEnvelope
    set?: audioWhereUniqueInput | audioWhereUniqueInput[]
    disconnect?: audioWhereUniqueInput | audioWhereUniqueInput[]
    delete?: audioWhereUniqueInput | audioWhereUniqueInput[]
    connect?: audioWhereUniqueInput | audioWhereUniqueInput[]
    update?: audioUpdateWithWhereUniqueWithoutAdminInput | audioUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: audioUpdateManyWithWhereWithoutAdminInput | audioUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: audioScalarWhereInput | audioScalarWhereInput[]
  }

  export type languageUpdateManyWithoutAdminNestedInput = {
    create?: XOR<languageCreateWithoutAdminInput, languageUncheckedCreateWithoutAdminInput> | languageCreateWithoutAdminInput[] | languageUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: languageCreateOrConnectWithoutAdminInput | languageCreateOrConnectWithoutAdminInput[]
    upsert?: languageUpsertWithWhereUniqueWithoutAdminInput | languageUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: languageCreateManyAdminInputEnvelope
    set?: languageWhereUniqueInput | languageWhereUniqueInput[]
    disconnect?: languageWhereUniqueInput | languageWhereUniqueInput[]
    delete?: languageWhereUniqueInput | languageWhereUniqueInput[]
    connect?: languageWhereUniqueInput | languageWhereUniqueInput[]
    update?: languageUpdateWithWhereUniqueWithoutAdminInput | languageUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: languageUpdateManyWithWhereWithoutAdminInput | languageUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: languageScalarWhereInput | languageScalarWhereInput[]
  }

  export type placeUpdateManyWithoutAdminNestedInput = {
    create?: XOR<placeCreateWithoutAdminInput, placeUncheckedCreateWithoutAdminInput> | placeCreateWithoutAdminInput[] | placeUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: placeCreateOrConnectWithoutAdminInput | placeCreateOrConnectWithoutAdminInput[]
    upsert?: placeUpsertWithWhereUniqueWithoutAdminInput | placeUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: placeCreateManyAdminInputEnvelope
    set?: placeWhereUniqueInput | placeWhereUniqueInput[]
    disconnect?: placeWhereUniqueInput | placeWhereUniqueInput[]
    delete?: placeWhereUniqueInput | placeWhereUniqueInput[]
    connect?: placeWhereUniqueInput | placeWhereUniqueInput[]
    update?: placeUpdateWithWhereUniqueWithoutAdminInput | placeUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: placeUpdateManyWithWhereWithoutAdminInput | placeUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: placeScalarWhereInput | placeScalarWhereInput[]
  }

  export type userUpdateManyWithoutAdminNestedInput = {
    create?: XOR<userCreateWithoutAdminInput, userUncheckedCreateWithoutAdminInput> | userCreateWithoutAdminInput[] | userUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: userCreateOrConnectWithoutAdminInput | userCreateOrConnectWithoutAdminInput[]
    upsert?: userUpsertWithWhereUniqueWithoutAdminInput | userUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: userCreateManyAdminInputEnvelope
    set?: userWhereUniqueInput | userWhereUniqueInput[]
    disconnect?: userWhereUniqueInput | userWhereUniqueInput[]
    delete?: userWhereUniqueInput | userWhereUniqueInput[]
    connect?: userWhereUniqueInput | userWhereUniqueInput[]
    update?: userUpdateWithWhereUniqueWithoutAdminInput | userUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: userUpdateManyWithWhereWithoutAdminInput | userUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: userScalarWhereInput | userScalarWhereInput[]
  }

  export type audioUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<audioCreateWithoutAdminInput, audioUncheckedCreateWithoutAdminInput> | audioCreateWithoutAdminInput[] | audioUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: audioCreateOrConnectWithoutAdminInput | audioCreateOrConnectWithoutAdminInput[]
    upsert?: audioUpsertWithWhereUniqueWithoutAdminInput | audioUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: audioCreateManyAdminInputEnvelope
    set?: audioWhereUniqueInput | audioWhereUniqueInput[]
    disconnect?: audioWhereUniqueInput | audioWhereUniqueInput[]
    delete?: audioWhereUniqueInput | audioWhereUniqueInput[]
    connect?: audioWhereUniqueInput | audioWhereUniqueInput[]
    update?: audioUpdateWithWhereUniqueWithoutAdminInput | audioUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: audioUpdateManyWithWhereWithoutAdminInput | audioUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: audioScalarWhereInput | audioScalarWhereInput[]
  }

  export type languageUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<languageCreateWithoutAdminInput, languageUncheckedCreateWithoutAdminInput> | languageCreateWithoutAdminInput[] | languageUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: languageCreateOrConnectWithoutAdminInput | languageCreateOrConnectWithoutAdminInput[]
    upsert?: languageUpsertWithWhereUniqueWithoutAdminInput | languageUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: languageCreateManyAdminInputEnvelope
    set?: languageWhereUniqueInput | languageWhereUniqueInput[]
    disconnect?: languageWhereUniqueInput | languageWhereUniqueInput[]
    delete?: languageWhereUniqueInput | languageWhereUniqueInput[]
    connect?: languageWhereUniqueInput | languageWhereUniqueInput[]
    update?: languageUpdateWithWhereUniqueWithoutAdminInput | languageUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: languageUpdateManyWithWhereWithoutAdminInput | languageUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: languageScalarWhereInput | languageScalarWhereInput[]
  }

  export type placeUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<placeCreateWithoutAdminInput, placeUncheckedCreateWithoutAdminInput> | placeCreateWithoutAdminInput[] | placeUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: placeCreateOrConnectWithoutAdminInput | placeCreateOrConnectWithoutAdminInput[]
    upsert?: placeUpsertWithWhereUniqueWithoutAdminInput | placeUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: placeCreateManyAdminInputEnvelope
    set?: placeWhereUniqueInput | placeWhereUniqueInput[]
    disconnect?: placeWhereUniqueInput | placeWhereUniqueInput[]
    delete?: placeWhereUniqueInput | placeWhereUniqueInput[]
    connect?: placeWhereUniqueInput | placeWhereUniqueInput[]
    update?: placeUpdateWithWhereUniqueWithoutAdminInput | placeUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: placeUpdateManyWithWhereWithoutAdminInput | placeUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: placeScalarWhereInput | placeScalarWhereInput[]
  }

  export type userUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<userCreateWithoutAdminInput, userUncheckedCreateWithoutAdminInput> | userCreateWithoutAdminInput[] | userUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: userCreateOrConnectWithoutAdminInput | userCreateOrConnectWithoutAdminInput[]
    upsert?: userUpsertWithWhereUniqueWithoutAdminInput | userUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: userCreateManyAdminInputEnvelope
    set?: userWhereUniqueInput | userWhereUniqueInput[]
    disconnect?: userWhereUniqueInput | userWhereUniqueInput[]
    delete?: userWhereUniqueInput | userWhereUniqueInput[]
    connect?: userWhereUniqueInput | userWhereUniqueInput[]
    update?: userUpdateWithWhereUniqueWithoutAdminInput | userUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: userUpdateManyWithWhereWithoutAdminInput | userUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: userScalarWhereInput | userScalarWhereInput[]
  }

  export type audioCreateimg_pathInput = {
    set: string[]
  }

  export type audioCreateimg_urlInput = {
    set: string[]
  }

  export type adminCreateNestedOneWithoutAudioInput = {
    create?: XOR<adminCreateWithoutAudioInput, adminUncheckedCreateWithoutAudioInput>
    connectOrCreate?: adminCreateOrConnectWithoutAudioInput
    connect?: adminWhereUniqueInput
  }

  export type audioUpdateimg_pathInput = {
    set?: string[]
    push?: string | string[]
  }

  export type audioUpdateimg_urlInput = {
    set?: string[]
    push?: string | string[]
  }

  export type adminUpdateOneWithoutAudioNestedInput = {
    create?: XOR<adminCreateWithoutAudioInput, adminUncheckedCreateWithoutAudioInput>
    connectOrCreate?: adminCreateOrConnectWithoutAudioInput
    upsert?: adminUpsertWithoutAudioInput
    disconnect?: adminWhereInput | boolean
    delete?: adminWhereInput | boolean
    connect?: adminWhereUniqueInput
    update?: XOR<XOR<adminUpdateToOneWithWhereWithoutAudioInput, adminUpdateWithoutAudioInput>, adminUncheckedUpdateWithoutAudioInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type adminCreateNestedOneWithoutLanguageInput = {
    create?: XOR<adminCreateWithoutLanguageInput, adminUncheckedCreateWithoutLanguageInput>
    connectOrCreate?: adminCreateOrConnectWithoutLanguageInput
    connect?: adminWhereUniqueInput
  }

  export type adminUpdateOneWithoutLanguageNestedInput = {
    create?: XOR<adminCreateWithoutLanguageInput, adminUncheckedCreateWithoutLanguageInput>
    connectOrCreate?: adminCreateOrConnectWithoutLanguageInput
    upsert?: adminUpsertWithoutLanguageInput
    disconnect?: adminWhereInput | boolean
    delete?: adminWhereInput | boolean
    connect?: adminWhereUniqueInput
    update?: XOR<XOR<adminUpdateToOneWithWhereWithoutLanguageInput, adminUpdateWithoutLanguageInput>, adminUncheckedUpdateWithoutLanguageInput>
  }

  export type adminCreateNestedOneWithoutPlaceInput = {
    create?: XOR<adminCreateWithoutPlaceInput, adminUncheckedCreateWithoutPlaceInput>
    connectOrCreate?: adminCreateOrConnectWithoutPlaceInput
    connect?: adminWhereUniqueInput
  }

  export type userCreateNestedManyWithoutPlaceInput = {
    create?: XOR<userCreateWithoutPlaceInput, userUncheckedCreateWithoutPlaceInput> | userCreateWithoutPlaceInput[] | userUncheckedCreateWithoutPlaceInput[]
    connectOrCreate?: userCreateOrConnectWithoutPlaceInput | userCreateOrConnectWithoutPlaceInput[]
    createMany?: userCreateManyPlaceInputEnvelope
    connect?: userWhereUniqueInput | userWhereUniqueInput[]
  }

  export type userUncheckedCreateNestedManyWithoutPlaceInput = {
    create?: XOR<userCreateWithoutPlaceInput, userUncheckedCreateWithoutPlaceInput> | userCreateWithoutPlaceInput[] | userUncheckedCreateWithoutPlaceInput[]
    connectOrCreate?: userCreateOrConnectWithoutPlaceInput | userCreateOrConnectWithoutPlaceInput[]
    createMany?: userCreateManyPlaceInputEnvelope
    connect?: userWhereUniqueInput | userWhereUniqueInput[]
  }

  export type adminUpdateOneWithoutPlaceNestedInput = {
    create?: XOR<adminCreateWithoutPlaceInput, adminUncheckedCreateWithoutPlaceInput>
    connectOrCreate?: adminCreateOrConnectWithoutPlaceInput
    upsert?: adminUpsertWithoutPlaceInput
    disconnect?: adminWhereInput | boolean
    delete?: adminWhereInput | boolean
    connect?: adminWhereUniqueInput
    update?: XOR<XOR<adminUpdateToOneWithWhereWithoutPlaceInput, adminUpdateWithoutPlaceInput>, adminUncheckedUpdateWithoutPlaceInput>
  }

  export type userUpdateManyWithoutPlaceNestedInput = {
    create?: XOR<userCreateWithoutPlaceInput, userUncheckedCreateWithoutPlaceInput> | userCreateWithoutPlaceInput[] | userUncheckedCreateWithoutPlaceInput[]
    connectOrCreate?: userCreateOrConnectWithoutPlaceInput | userCreateOrConnectWithoutPlaceInput[]
    upsert?: userUpsertWithWhereUniqueWithoutPlaceInput | userUpsertWithWhereUniqueWithoutPlaceInput[]
    createMany?: userCreateManyPlaceInputEnvelope
    set?: userWhereUniqueInput | userWhereUniqueInput[]
    disconnect?: userWhereUniqueInput | userWhereUniqueInput[]
    delete?: userWhereUniqueInput | userWhereUniqueInput[]
    connect?: userWhereUniqueInput | userWhereUniqueInput[]
    update?: userUpdateWithWhereUniqueWithoutPlaceInput | userUpdateWithWhereUniqueWithoutPlaceInput[]
    updateMany?: userUpdateManyWithWhereWithoutPlaceInput | userUpdateManyWithWhereWithoutPlaceInput[]
    deleteMany?: userScalarWhereInput | userScalarWhereInput[]
  }

  export type userUncheckedUpdateManyWithoutPlaceNestedInput = {
    create?: XOR<userCreateWithoutPlaceInput, userUncheckedCreateWithoutPlaceInput> | userCreateWithoutPlaceInput[] | userUncheckedCreateWithoutPlaceInput[]
    connectOrCreate?: userCreateOrConnectWithoutPlaceInput | userCreateOrConnectWithoutPlaceInput[]
    upsert?: userUpsertWithWhereUniqueWithoutPlaceInput | userUpsertWithWhereUniqueWithoutPlaceInput[]
    createMany?: userCreateManyPlaceInputEnvelope
    set?: userWhereUniqueInput | userWhereUniqueInput[]
    disconnect?: userWhereUniqueInput | userWhereUniqueInput[]
    delete?: userWhereUniqueInput | userWhereUniqueInput[]
    connect?: userWhereUniqueInput | userWhereUniqueInput[]
    update?: userUpdateWithWhereUniqueWithoutPlaceInput | userUpdateWithWhereUniqueWithoutPlaceInput[]
    updateMany?: userUpdateManyWithWhereWithoutPlaceInput | userUpdateManyWithWhereWithoutPlaceInput[]
    deleteMany?: userScalarWhereInput | userScalarWhereInput[]
  }

  export type adminCreateNestedOneWithoutUserInput = {
    create?: XOR<adminCreateWithoutUserInput, adminUncheckedCreateWithoutUserInput>
    connectOrCreate?: adminCreateOrConnectWithoutUserInput
    connect?: adminWhereUniqueInput
  }

  export type placeCreateNestedOneWithoutUserInput = {
    create?: XOR<placeCreateWithoutUserInput, placeUncheckedCreateWithoutUserInput>
    connectOrCreate?: placeCreateOrConnectWithoutUserInput
    connect?: placeWhereUniqueInput
  }

  export type adminUpdateOneWithoutUserNestedInput = {
    create?: XOR<adminCreateWithoutUserInput, adminUncheckedCreateWithoutUserInput>
    connectOrCreate?: adminCreateOrConnectWithoutUserInput
    upsert?: adminUpsertWithoutUserInput
    disconnect?: adminWhereInput | boolean
    delete?: adminWhereInput | boolean
    connect?: adminWhereUniqueInput
    update?: XOR<XOR<adminUpdateToOneWithWhereWithoutUserInput, adminUpdateWithoutUserInput>, adminUncheckedUpdateWithoutUserInput>
  }

  export type placeUpdateOneWithoutUserNestedInput = {
    create?: XOR<placeCreateWithoutUserInput, placeUncheckedCreateWithoutUserInput>
    connectOrCreate?: placeCreateOrConnectWithoutUserInput
    upsert?: placeUpsertWithoutUserInput
    disconnect?: placeWhereInput | boolean
    delete?: placeWhereInput | boolean
    connect?: placeWhereUniqueInput
    update?: XOR<XOR<placeUpdateToOneWithWhereWithoutUserInput, placeUpdateWithoutUserInput>, placeUncheckedUpdateWithoutUserInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type audioCreateWithoutAdminInput = {
    img_path?: audioCreateimg_pathInput | string[]
    place_id: string
    language_id: string
    created_at?: Date | string
    updated_at: Date | string
    file_path: string
    file_url: string
    img_url?: audioCreateimg_urlInput | string[]
    id: string
  }

  export type audioUncheckedCreateWithoutAdminInput = {
    img_path?: audioCreateimg_pathInput | string[]
    place_id: string
    language_id: string
    created_at?: Date | string
    updated_at: Date | string
    file_path: string
    file_url: string
    img_url?: audioCreateimg_urlInput | string[]
    id: string
  }

  export type audioCreateOrConnectWithoutAdminInput = {
    where: audioWhereUniqueInput
    create: XOR<audioCreateWithoutAdminInput, audioUncheckedCreateWithoutAdminInput>
  }

  export type audioCreateManyAdminInputEnvelope = {
    data: audioCreateManyAdminInput | audioCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type languageCreateWithoutAdminInput = {
    id: string
    name: string
    img_path: string
    created_at?: Date | string
    updated_at: Date | string
    img_url: string
  }

  export type languageUncheckedCreateWithoutAdminInput = {
    id: string
    name: string
    img_path: string
    created_at?: Date | string
    updated_at: Date | string
    img_url: string
  }

  export type languageCreateOrConnectWithoutAdminInput = {
    where: languageWhereUniqueInput
    create: XOR<languageCreateWithoutAdminInput, languageUncheckedCreateWithoutAdminInput>
  }

  export type languageCreateManyAdminInputEnvelope = {
    data: languageCreateManyAdminInput | languageCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type placeCreateWithoutAdminInput = {
    id: string
    name: string
    img_path: string
    created_at?: Date | string
    updated_at: Date | string
    img_url: string
    user?: userCreateNestedManyWithoutPlaceInput
  }

  export type placeUncheckedCreateWithoutAdminInput = {
    id: string
    name: string
    img_path: string
    created_at?: Date | string
    updated_at: Date | string
    img_url: string
    user?: userUncheckedCreateNestedManyWithoutPlaceInput
  }

  export type placeCreateOrConnectWithoutAdminInput = {
    where: placeWhereUniqueInput
    create: XOR<placeCreateWithoutAdminInput, placeUncheckedCreateWithoutAdminInput>
  }

  export type placeCreateManyAdminInputEnvelope = {
    data: placeCreateManyAdminInput | placeCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type userCreateWithoutAdminInput = {
    id: string
    name: string
    username: string
    password: string
    created_at?: Date | string
    updated_at: Date | string
    place?: placeCreateNestedOneWithoutUserInput
  }

  export type userUncheckedCreateWithoutAdminInput = {
    id: string
    name: string
    username: string
    password: string
    place_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type userCreateOrConnectWithoutAdminInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutAdminInput, userUncheckedCreateWithoutAdminInput>
  }

  export type userCreateManyAdminInputEnvelope = {
    data: userCreateManyAdminInput | userCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type audioUpsertWithWhereUniqueWithoutAdminInput = {
    where: audioWhereUniqueInput
    update: XOR<audioUpdateWithoutAdminInput, audioUncheckedUpdateWithoutAdminInput>
    create: XOR<audioCreateWithoutAdminInput, audioUncheckedCreateWithoutAdminInput>
  }

  export type audioUpdateWithWhereUniqueWithoutAdminInput = {
    where: audioWhereUniqueInput
    data: XOR<audioUpdateWithoutAdminInput, audioUncheckedUpdateWithoutAdminInput>
  }

  export type audioUpdateManyWithWhereWithoutAdminInput = {
    where: audioScalarWhereInput
    data: XOR<audioUpdateManyMutationInput, audioUncheckedUpdateManyWithoutAdminInput>
  }

  export type audioScalarWhereInput = {
    AND?: audioScalarWhereInput | audioScalarWhereInput[]
    OR?: audioScalarWhereInput[]
    NOT?: audioScalarWhereInput | audioScalarWhereInput[]
    img_path?: StringNullableListFilter<"audio">
    place_id?: StringFilter<"audio"> | string
    language_id?: StringFilter<"audio"> | string
    admin_id?: StringNullableFilter<"audio"> | string | null
    created_at?: DateTimeFilter<"audio"> | Date | string
    updated_at?: DateTimeFilter<"audio"> | Date | string
    file_path?: StringFilter<"audio"> | string
    file_url?: StringFilter<"audio"> | string
    img_url?: StringNullableListFilter<"audio">
    id?: StringFilter<"audio"> | string
  }

  export type languageUpsertWithWhereUniqueWithoutAdminInput = {
    where: languageWhereUniqueInput
    update: XOR<languageUpdateWithoutAdminInput, languageUncheckedUpdateWithoutAdminInput>
    create: XOR<languageCreateWithoutAdminInput, languageUncheckedCreateWithoutAdminInput>
  }

  export type languageUpdateWithWhereUniqueWithoutAdminInput = {
    where: languageWhereUniqueInput
    data: XOR<languageUpdateWithoutAdminInput, languageUncheckedUpdateWithoutAdminInput>
  }

  export type languageUpdateManyWithWhereWithoutAdminInput = {
    where: languageScalarWhereInput
    data: XOR<languageUpdateManyMutationInput, languageUncheckedUpdateManyWithoutAdminInput>
  }

  export type languageScalarWhereInput = {
    AND?: languageScalarWhereInput | languageScalarWhereInput[]
    OR?: languageScalarWhereInput[]
    NOT?: languageScalarWhereInput | languageScalarWhereInput[]
    id?: StringFilter<"language"> | string
    name?: StringFilter<"language"> | string
    img_path?: StringFilter<"language"> | string
    admin_id?: StringNullableFilter<"language"> | string | null
    created_at?: DateTimeFilter<"language"> | Date | string
    updated_at?: DateTimeFilter<"language"> | Date | string
    img_url?: StringFilter<"language"> | string
  }

  export type placeUpsertWithWhereUniqueWithoutAdminInput = {
    where: placeWhereUniqueInput
    update: XOR<placeUpdateWithoutAdminInput, placeUncheckedUpdateWithoutAdminInput>
    create: XOR<placeCreateWithoutAdminInput, placeUncheckedCreateWithoutAdminInput>
  }

  export type placeUpdateWithWhereUniqueWithoutAdminInput = {
    where: placeWhereUniqueInput
    data: XOR<placeUpdateWithoutAdminInput, placeUncheckedUpdateWithoutAdminInput>
  }

  export type placeUpdateManyWithWhereWithoutAdminInput = {
    where: placeScalarWhereInput
    data: XOR<placeUpdateManyMutationInput, placeUncheckedUpdateManyWithoutAdminInput>
  }

  export type placeScalarWhereInput = {
    AND?: placeScalarWhereInput | placeScalarWhereInput[]
    OR?: placeScalarWhereInput[]
    NOT?: placeScalarWhereInput | placeScalarWhereInput[]
    id?: StringFilter<"place"> | string
    name?: StringFilter<"place"> | string
    img_path?: StringFilter<"place"> | string
    admin_id?: StringNullableFilter<"place"> | string | null
    created_at?: DateTimeFilter<"place"> | Date | string
    updated_at?: DateTimeFilter<"place"> | Date | string
    img_url?: StringFilter<"place"> | string
  }

  export type userUpsertWithWhereUniqueWithoutAdminInput = {
    where: userWhereUniqueInput
    update: XOR<userUpdateWithoutAdminInput, userUncheckedUpdateWithoutAdminInput>
    create: XOR<userCreateWithoutAdminInput, userUncheckedCreateWithoutAdminInput>
  }

  export type userUpdateWithWhereUniqueWithoutAdminInput = {
    where: userWhereUniqueInput
    data: XOR<userUpdateWithoutAdminInput, userUncheckedUpdateWithoutAdminInput>
  }

  export type userUpdateManyWithWhereWithoutAdminInput = {
    where: userScalarWhereInput
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyWithoutAdminInput>
  }

  export type userScalarWhereInput = {
    AND?: userScalarWhereInput | userScalarWhereInput[]
    OR?: userScalarWhereInput[]
    NOT?: userScalarWhereInput | userScalarWhereInput[]
    id?: StringFilter<"user"> | string
    name?: StringFilter<"user"> | string
    username?: StringFilter<"user"> | string
    password?: StringFilter<"user"> | string
    place_id?: StringNullableFilter<"user"> | string | null
    admin_id?: StringNullableFilter<"user"> | string | null
    created_at?: DateTimeFilter<"user"> | Date | string
    updated_at?: DateTimeFilter<"user"> | Date | string
  }

  export type adminCreateWithoutAudioInput = {
    id: string
    name: string
    username: string
    password: string
    created_at?: Date | string
    updated_at: Date | string
    roles?: adminCreaterolesInput | $Enums.AdminRoles[]
    language?: languageCreateNestedManyWithoutAdminInput
    place?: placeCreateNestedManyWithoutAdminInput
    user?: userCreateNestedManyWithoutAdminInput
  }

  export type adminUncheckedCreateWithoutAudioInput = {
    id: string
    name: string
    username: string
    password: string
    created_at?: Date | string
    updated_at: Date | string
    roles?: adminCreaterolesInput | $Enums.AdminRoles[]
    language?: languageUncheckedCreateNestedManyWithoutAdminInput
    place?: placeUncheckedCreateNestedManyWithoutAdminInput
    user?: userUncheckedCreateNestedManyWithoutAdminInput
  }

  export type adminCreateOrConnectWithoutAudioInput = {
    where: adminWhereUniqueInput
    create: XOR<adminCreateWithoutAudioInput, adminUncheckedCreateWithoutAudioInput>
  }

  export type adminUpsertWithoutAudioInput = {
    update: XOR<adminUpdateWithoutAudioInput, adminUncheckedUpdateWithoutAudioInput>
    create: XOR<adminCreateWithoutAudioInput, adminUncheckedCreateWithoutAudioInput>
    where?: adminWhereInput
  }

  export type adminUpdateToOneWithWhereWithoutAudioInput = {
    where?: adminWhereInput
    data: XOR<adminUpdateWithoutAudioInput, adminUncheckedUpdateWithoutAudioInput>
  }

  export type adminUpdateWithoutAudioInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: adminUpdaterolesInput | $Enums.AdminRoles[]
    language?: languageUpdateManyWithoutAdminNestedInput
    place?: placeUpdateManyWithoutAdminNestedInput
    user?: userUpdateManyWithoutAdminNestedInput
  }

  export type adminUncheckedUpdateWithoutAudioInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: adminUpdaterolesInput | $Enums.AdminRoles[]
    language?: languageUncheckedUpdateManyWithoutAdminNestedInput
    place?: placeUncheckedUpdateManyWithoutAdminNestedInput
    user?: userUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type adminCreateWithoutLanguageInput = {
    id: string
    name: string
    username: string
    password: string
    created_at?: Date | string
    updated_at: Date | string
    roles?: adminCreaterolesInput | $Enums.AdminRoles[]
    audio?: audioCreateNestedManyWithoutAdminInput
    place?: placeCreateNestedManyWithoutAdminInput
    user?: userCreateNestedManyWithoutAdminInput
  }

  export type adminUncheckedCreateWithoutLanguageInput = {
    id: string
    name: string
    username: string
    password: string
    created_at?: Date | string
    updated_at: Date | string
    roles?: adminCreaterolesInput | $Enums.AdminRoles[]
    audio?: audioUncheckedCreateNestedManyWithoutAdminInput
    place?: placeUncheckedCreateNestedManyWithoutAdminInput
    user?: userUncheckedCreateNestedManyWithoutAdminInput
  }

  export type adminCreateOrConnectWithoutLanguageInput = {
    where: adminWhereUniqueInput
    create: XOR<adminCreateWithoutLanguageInput, adminUncheckedCreateWithoutLanguageInput>
  }

  export type adminUpsertWithoutLanguageInput = {
    update: XOR<adminUpdateWithoutLanguageInput, adminUncheckedUpdateWithoutLanguageInput>
    create: XOR<adminCreateWithoutLanguageInput, adminUncheckedCreateWithoutLanguageInput>
    where?: adminWhereInput
  }

  export type adminUpdateToOneWithWhereWithoutLanguageInput = {
    where?: adminWhereInput
    data: XOR<adminUpdateWithoutLanguageInput, adminUncheckedUpdateWithoutLanguageInput>
  }

  export type adminUpdateWithoutLanguageInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: adminUpdaterolesInput | $Enums.AdminRoles[]
    audio?: audioUpdateManyWithoutAdminNestedInput
    place?: placeUpdateManyWithoutAdminNestedInput
    user?: userUpdateManyWithoutAdminNestedInput
  }

  export type adminUncheckedUpdateWithoutLanguageInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: adminUpdaterolesInput | $Enums.AdminRoles[]
    audio?: audioUncheckedUpdateManyWithoutAdminNestedInput
    place?: placeUncheckedUpdateManyWithoutAdminNestedInput
    user?: userUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type adminCreateWithoutPlaceInput = {
    id: string
    name: string
    username: string
    password: string
    created_at?: Date | string
    updated_at: Date | string
    roles?: adminCreaterolesInput | $Enums.AdminRoles[]
    audio?: audioCreateNestedManyWithoutAdminInput
    language?: languageCreateNestedManyWithoutAdminInput
    user?: userCreateNestedManyWithoutAdminInput
  }

  export type adminUncheckedCreateWithoutPlaceInput = {
    id: string
    name: string
    username: string
    password: string
    created_at?: Date | string
    updated_at: Date | string
    roles?: adminCreaterolesInput | $Enums.AdminRoles[]
    audio?: audioUncheckedCreateNestedManyWithoutAdminInput
    language?: languageUncheckedCreateNestedManyWithoutAdminInput
    user?: userUncheckedCreateNestedManyWithoutAdminInput
  }

  export type adminCreateOrConnectWithoutPlaceInput = {
    where: adminWhereUniqueInput
    create: XOR<adminCreateWithoutPlaceInput, adminUncheckedCreateWithoutPlaceInput>
  }

  export type userCreateWithoutPlaceInput = {
    id: string
    name: string
    username: string
    password: string
    created_at?: Date | string
    updated_at: Date | string
    admin?: adminCreateNestedOneWithoutUserInput
  }

  export type userUncheckedCreateWithoutPlaceInput = {
    id: string
    name: string
    username: string
    password: string
    admin_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type userCreateOrConnectWithoutPlaceInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutPlaceInput, userUncheckedCreateWithoutPlaceInput>
  }

  export type userCreateManyPlaceInputEnvelope = {
    data: userCreateManyPlaceInput | userCreateManyPlaceInput[]
    skipDuplicates?: boolean
  }

  export type adminUpsertWithoutPlaceInput = {
    update: XOR<adminUpdateWithoutPlaceInput, adminUncheckedUpdateWithoutPlaceInput>
    create: XOR<adminCreateWithoutPlaceInput, adminUncheckedCreateWithoutPlaceInput>
    where?: adminWhereInput
  }

  export type adminUpdateToOneWithWhereWithoutPlaceInput = {
    where?: adminWhereInput
    data: XOR<adminUpdateWithoutPlaceInput, adminUncheckedUpdateWithoutPlaceInput>
  }

  export type adminUpdateWithoutPlaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: adminUpdaterolesInput | $Enums.AdminRoles[]
    audio?: audioUpdateManyWithoutAdminNestedInput
    language?: languageUpdateManyWithoutAdminNestedInput
    user?: userUpdateManyWithoutAdminNestedInput
  }

  export type adminUncheckedUpdateWithoutPlaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: adminUpdaterolesInput | $Enums.AdminRoles[]
    audio?: audioUncheckedUpdateManyWithoutAdminNestedInput
    language?: languageUncheckedUpdateManyWithoutAdminNestedInput
    user?: userUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type userUpsertWithWhereUniqueWithoutPlaceInput = {
    where: userWhereUniqueInput
    update: XOR<userUpdateWithoutPlaceInput, userUncheckedUpdateWithoutPlaceInput>
    create: XOR<userCreateWithoutPlaceInput, userUncheckedCreateWithoutPlaceInput>
  }

  export type userUpdateWithWhereUniqueWithoutPlaceInput = {
    where: userWhereUniqueInput
    data: XOR<userUpdateWithoutPlaceInput, userUncheckedUpdateWithoutPlaceInput>
  }

  export type userUpdateManyWithWhereWithoutPlaceInput = {
    where: userScalarWhereInput
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyWithoutPlaceInput>
  }

  export type adminCreateWithoutUserInput = {
    id: string
    name: string
    username: string
    password: string
    created_at?: Date | string
    updated_at: Date | string
    roles?: adminCreaterolesInput | $Enums.AdminRoles[]
    audio?: audioCreateNestedManyWithoutAdminInput
    language?: languageCreateNestedManyWithoutAdminInput
    place?: placeCreateNestedManyWithoutAdminInput
  }

  export type adminUncheckedCreateWithoutUserInput = {
    id: string
    name: string
    username: string
    password: string
    created_at?: Date | string
    updated_at: Date | string
    roles?: adminCreaterolesInput | $Enums.AdminRoles[]
    audio?: audioUncheckedCreateNestedManyWithoutAdminInput
    language?: languageUncheckedCreateNestedManyWithoutAdminInput
    place?: placeUncheckedCreateNestedManyWithoutAdminInput
  }

  export type adminCreateOrConnectWithoutUserInput = {
    where: adminWhereUniqueInput
    create: XOR<adminCreateWithoutUserInput, adminUncheckedCreateWithoutUserInput>
  }

  export type placeCreateWithoutUserInput = {
    id: string
    name: string
    img_path: string
    created_at?: Date | string
    updated_at: Date | string
    img_url: string
    admin?: adminCreateNestedOneWithoutPlaceInput
  }

  export type placeUncheckedCreateWithoutUserInput = {
    id: string
    name: string
    img_path: string
    admin_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
    img_url: string
  }

  export type placeCreateOrConnectWithoutUserInput = {
    where: placeWhereUniqueInput
    create: XOR<placeCreateWithoutUserInput, placeUncheckedCreateWithoutUserInput>
  }

  export type adminUpsertWithoutUserInput = {
    update: XOR<adminUpdateWithoutUserInput, adminUncheckedUpdateWithoutUserInput>
    create: XOR<adminCreateWithoutUserInput, adminUncheckedCreateWithoutUserInput>
    where?: adminWhereInput
  }

  export type adminUpdateToOneWithWhereWithoutUserInput = {
    where?: adminWhereInput
    data: XOR<adminUpdateWithoutUserInput, adminUncheckedUpdateWithoutUserInput>
  }

  export type adminUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: adminUpdaterolesInput | $Enums.AdminRoles[]
    audio?: audioUpdateManyWithoutAdminNestedInput
    language?: languageUpdateManyWithoutAdminNestedInput
    place?: placeUpdateManyWithoutAdminNestedInput
  }

  export type adminUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: adminUpdaterolesInput | $Enums.AdminRoles[]
    audio?: audioUncheckedUpdateManyWithoutAdminNestedInput
    language?: languageUncheckedUpdateManyWithoutAdminNestedInput
    place?: placeUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type placeUpsertWithoutUserInput = {
    update: XOR<placeUpdateWithoutUserInput, placeUncheckedUpdateWithoutUserInput>
    create: XOR<placeCreateWithoutUserInput, placeUncheckedCreateWithoutUserInput>
    where?: placeWhereInput
  }

  export type placeUpdateToOneWithWhereWithoutUserInput = {
    where?: placeWhereInput
    data: XOR<placeUpdateWithoutUserInput, placeUncheckedUpdateWithoutUserInput>
  }

  export type placeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    img_path?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    img_url?: StringFieldUpdateOperationsInput | string
    admin?: adminUpdateOneWithoutPlaceNestedInput
  }

  export type placeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    img_path?: StringFieldUpdateOperationsInput | string
    admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    img_url?: StringFieldUpdateOperationsInput | string
  }

  export type audioCreateManyAdminInput = {
    img_path?: audioCreateimg_pathInput | string[]
    place_id: string
    language_id: string
    created_at?: Date | string
    updated_at: Date | string
    file_path: string
    file_url: string
    img_url?: audioCreateimg_urlInput | string[]
    id: string
  }

  export type languageCreateManyAdminInput = {
    id: string
    name: string
    img_path: string
    created_at?: Date | string
    updated_at: Date | string
    img_url: string
  }

  export type placeCreateManyAdminInput = {
    id: string
    name: string
    img_path: string
    created_at?: Date | string
    updated_at: Date | string
    img_url: string
  }

  export type userCreateManyAdminInput = {
    id: string
    name: string
    username: string
    password: string
    place_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type audioUpdateWithoutAdminInput = {
    img_path?: audioUpdateimg_pathInput | string[]
    place_id?: StringFieldUpdateOperationsInput | string
    language_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    img_url?: audioUpdateimg_urlInput | string[]
    id?: StringFieldUpdateOperationsInput | string
  }

  export type audioUncheckedUpdateWithoutAdminInput = {
    img_path?: audioUpdateimg_pathInput | string[]
    place_id?: StringFieldUpdateOperationsInput | string
    language_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    img_url?: audioUpdateimg_urlInput | string[]
    id?: StringFieldUpdateOperationsInput | string
  }

  export type audioUncheckedUpdateManyWithoutAdminInput = {
    img_path?: audioUpdateimg_pathInput | string[]
    place_id?: StringFieldUpdateOperationsInput | string
    language_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    img_url?: audioUpdateimg_urlInput | string[]
    id?: StringFieldUpdateOperationsInput | string
  }

  export type languageUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    img_path?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    img_url?: StringFieldUpdateOperationsInput | string
  }

  export type languageUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    img_path?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    img_url?: StringFieldUpdateOperationsInput | string
  }

  export type languageUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    img_path?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    img_url?: StringFieldUpdateOperationsInput | string
  }

  export type placeUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    img_path?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    img_url?: StringFieldUpdateOperationsInput | string
    user?: userUpdateManyWithoutPlaceNestedInput
  }

  export type placeUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    img_path?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    img_url?: StringFieldUpdateOperationsInput | string
    user?: userUncheckedUpdateManyWithoutPlaceNestedInput
  }

  export type placeUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    img_path?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    img_url?: StringFieldUpdateOperationsInput | string
  }

  export type userUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    place?: placeUpdateOneWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    place_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    place_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userCreateManyPlaceInput = {
    id: string
    name: string
    username: string
    password: string
    admin_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type userUpdateWithoutPlaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: adminUpdateOneWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutPlaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userUncheckedUpdateManyWithoutPlaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    admin_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use AdminCountOutputTypeDefaultArgs instead
     */
    export type AdminCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlaceCountOutputTypeDefaultArgs instead
     */
    export type PlaceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlaceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use adminDefaultArgs instead
     */
    export type adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = adminDefaultArgs<ExtArgs>
    /**
     * @deprecated Use audioDefaultArgs instead
     */
    export type audioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = audioDefaultArgs<ExtArgs>
    /**
     * @deprecated Use languageDefaultArgs instead
     */
    export type languageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = languageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use placeDefaultArgs instead
     */
    export type placeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = placeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use userDefaultArgs instead
     */
    export type userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = userDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}