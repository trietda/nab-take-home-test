declare namespace Express {
  interface Request {
    locals: {
      user: string
    }
  }
}
