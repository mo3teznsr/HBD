import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.log({error});
      const errorMessage = error instanceof Error ? error.message : "Failed to register user";

      res.status(500).json({ 
        error: errorMessage, 
     
      });
     
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = await this.authService.login(req.body);
      res.status(200).json(token );
    } catch (error) {
      res.status(401).json({ error: "Invalid credentials" });
    }
  };
  me=async(req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.authService.me(req);
      res.status(200).json(user);
    } catch (error) {
      res.status(401).json({ error: "Invalid credentials",message:error });
    }
  };
}