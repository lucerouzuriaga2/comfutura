export interface IAdmin {
  name: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBlog {
  title: string;
  slug: string;
  content: string;
  author: string;
  image: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProject {
  title: string;
  description: string;
  client: string;
  image: string;
  category: string;
  technologies: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISection {
  key: string;
  title: string;
  content: string;
  metadata?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}
