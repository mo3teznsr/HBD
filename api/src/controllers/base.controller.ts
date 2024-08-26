import { Request, Response } from "express";
import { BaseService } from "../services/base.service";

export class BaseController<T> {
  service: BaseService<T>;

  constructor(service: BaseService<T>) {
    this.service = service;
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.service.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to create resource" });
    }
  };

  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.service.findAll(req.query);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve resources" });
    }
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.service.findById(Number(req.params.id));
      if (!item) {
        return res.status(404).json({ error: "Resource not found" });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve resource" });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.service.update(Number(req.params.id), req.body);
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to update resource" });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.service.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete resource" });
    }
  };
}