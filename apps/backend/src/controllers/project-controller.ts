import { Request, Response } from "express";
import db from "@repo/database/client";

export const createProject = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.id;

        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user) {
            res.status(404).json({
                message: "user not found"
            })
            return
        }

        const project = await db.project.create({
            data: {
                name,
                description,
                userId : userId,
                status: "ACTIVE"
            }
        })

        res.status(201).json({
            message: 'Project created successfully',
            projectId: project.id
        })
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getProjects = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user) {
            res.status(404).json({
                message: "User not found"
            })
        }

        const projects = await db.project.findMany({
            where: {
                userId: userId
            }
        });
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getProjectsById = async (req: Request, res: Response) => {
    try {
        const {projectId} = req.params;
        const userId = req.user.id;
        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        })
        if(!user) {
            res.status(404).json({
                message: "User not found"
            })
        }
        const project = await db.project.findUnique({
            where: {
                id: projectId,
                userId: userId
            }
        })
        if(!project) {
            res.status(404).json({
                message: "Project not found"
            })
        }

        res.status(200).json({
            project
        })
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}