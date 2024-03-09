import { Controller, Post, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { Routes } from 'src/utils/constants'

@Controller(Routes.USERS)
export class UsersController {}
