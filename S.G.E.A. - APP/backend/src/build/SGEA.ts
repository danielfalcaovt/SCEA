import express, { Request, Response } from "express";
import pg from "pg";
import bcrypt from "bcryptjs";
import axios from "axios";
import cors from "cors";
import Routes from "../config/Routes/Routes";

const app = express();
const port: number = 3000;

Promise.all([
  app.use(cors()),
  app.use(express.json()),
  app.use(Routes)
]);
