import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface RequestExt extends Request {
  idUser?: JwtPayload | { idUser: string };
}

export type LoginResponse = {
    status: number
    token: string
}

export type PostResponse = {
    status: number
    token: string
    user: Partial<User>
    movie: Partial<Movie>
    comment: Partial<Comment>
}

export type Scope = {
    total: number,
    page: number,
    limit: number
}

export type GetResponse = {
    status: number
    token: string
    scope: Partial<Scope>
    movies: Partial<Movie>[]
    comments: Partial<Comment>[]
    users: Partial<User>[]
}

export type ErrorResponse = {
    status: number
    error: string
    errorDetail: string
}

export type User = {
    id: string
    user: string
    password: string
    rol: Rol
}

export enum Rol { ADMIN = 'ADMIN', USUARIO = 'USUARIO' }

export type Movie = {
    id: string
    idUser: string
    name: string
    qualification: number
    status: Status
}

export enum Status { PENDIENTE = 'PENDIENTE', ACEPTADO = 'ACEPTADO' }

export type Comment = {
    id: string
    idMovie: string
    idUser: string
    comment: string
    qualification: number
}